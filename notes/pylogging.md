To make it easier to switch between monitoring tools like Azure Application Insights and Datadog, you can use the Strategy Pattern to abstract the telemetry functionality. This design separates the monitoring logic from the application logic, allowing you to swap out telemetry tools with minimal code changes.

Step-by-Step Implementation

1. Define a Base Monitoring Interface

Create a base class that defines the monitoring methods your app will use.

from abc import ABC, abstractmethod

class TelemetryClient(ABC):
    @abstractmethod
    def track_request(self, name: str, url: str, status_code: int, duration: float):
        pass

    @abstractmethod
    def track_event(self, name: str, properties: dict = None):
        pass

    @abstractmethod
    def track_exception(self, exception: Exception, properties: dict = None):
        pass

2. Implement Azure Application Insights Telemetry

Create a class that implements the TelemetryClient interface for Azure Application Insights.

from opencensus.ext.azure.trace_exporter import AzureExporter
from opencensus.trace.tracer import Tracer

class AzureTelemetryClient(TelemetryClient):
    def __init__(self, instrumentation_key: str):
        self.exporter = AzureExporter(connection_string=f"InstrumentationKey={instrumentation_key}")
        self.tracer = Tracer(exporter=self.exporter)

    def track_request(self, name: str, url: str, status_code: int, duration: float):
        self.tracer.span_context.trace_options = 1  # Enable tracing
        with self.tracer.span(name=name):
            pass  # Request telemetry is automatically tracked via middleware

    def track_event(self, name: str, properties: dict = None):
        self.exporter.export_event({"name": name, "properties": properties or {}})

    def track_exception(self, exception: Exception, properties: dict = None):
        self.exporter.export_event({"name": "exception", "properties": {"message": str(exception), **(properties or {})}})

3. Implement Datadog Telemetry

Create a class for Datadog (or another monitoring tool).

from ddtrace import tracer

class DatadogTelemetryClient(TelemetryClient):
    def track_request(self, name: str, url: str, status_code: int, duration: float):
        with tracer.trace(name) as span:
            span.set_tag("http.url", url)
            span.set_tag("http.status_code", status_code)
            span.set_tag("http.duration", duration)

    def track_event(self, name: str, properties: dict = None):
        tracer.current_span().set_tag(name, properties or {})

    def track_exception(self, exception: Exception, properties: dict = None):
        tracer.current_span().set_tag("error", str(exception))
        if properties:
            for key, value in properties.items():
                tracer.current_span().set_tag(key, value)

4. Create a Factory for Telemetry Clients

Use a factory or configuration-based approach to select the telemetry client.

class TelemetryFactory:
    @staticmethod
    def get_client(tool: str, config: dict) -> TelemetryClient:
        if tool == "azure":
            return AzureTelemetryClient(config.get("instrumentation_key"))
        elif tool == "datadog":
            return DatadogTelemetryClient()
        else:
            raise ValueError(f"Unsupported telemetry tool: {tool}")

5. Integrate with FastAPI

Inject the telemetry client into your FastAPI app.

from fastapi import FastAPI, Request, Depends
import time

app = FastAPI()

# Configure the telemetry client
telemetry_tool = "azure"  # or "datadog"
telemetry_config = {"instrumentation_key": "YOUR_INSTRUMENTATION_KEY"}
telemetry_client = TelemetryFactory.get_client(telemetry_tool, telemetry_config)

@app.middleware("http")
async def telemetry_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time

    telemetry_client.track_request(
        name=f"{request.method} {request.url.path}",
        url=str(request.url),
        status_code=response.status_code,
        duration=duration,
    )
    return response

@app.get("/")
async def root():
    telemetry_client.track_event("Home accessed", {"user": "anonymous"})
    return {"message": "Hello, World!"}

@app.get("/error")
async def error():
    try:
        1 / 0
    except ZeroDivisionError as e:
        telemetry_client.track_exception(e)
        return {"error": "Something went wrong"}

6. Switching Between Tools

To switch between Azure Application Insights and Datadog:
	1.	Change the telemetry_tool variable in the configuration to "azure" or "datadog".
	2.	Add any tool-specific configurations to telemetry_config.

Benefits of This Design
	•	Abstraction: The application code doesn’t depend on a specific telemetry tool.
	•	Flexibility: Switching between tools requires minimal changes.
	•	Extensibility: Add more telemetry tools by implementing the TelemetryClient interface.

Let me know if you’d like a complete working example!