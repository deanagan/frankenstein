Adding logging with Application Insights to your FastAPI web API can be done using the opencensus-ext-azure library for Azure Application Insights integration. Here’s a step-by-step guide:

1. Install Required Libraries

Run the following command to install the necessary libraries:

pip install opencensus-ext-azure opencensus-ext-fastapi opencensus-ext-logging

2. Set Up Application Insights in Azure
	•	Create an Application Insights resource in the Azure portal if you don’t already have one.
	•	Get the Instrumentation Key or Connection String from the Application Insights resource. You’ll need it for the setup.

3. Configure Application Insights in Your FastAPI Project

Create a logging_config.py file (or add to your existing configuration) to set up logging and telemetry.

import logging
from opencensus.ext.azure.log_exporter import AzureLogHandler
from opencensus.ext.azure.trace_exporter import AzureExporter
from opencensus.trace.samplers import ProbabilitySampler

# Replace with your Application Insights instrumentation key
INSTRUMENTATION_KEY = "your_instrumentation_key"

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add Application Insights log handler
logger.addHandler(AzureLogHandler(connection_string=f"InstrumentationKey={INSTRUMENTATION_KEY}"))

# Optional: Configure trace exporter for telemetry
trace_exporter = AzureExporter(connection_string=f"InstrumentationKey={INSTRUMENTATION_KEY}")
trace_exporter.add_telemetry_processor(lambda span: setattr(span, "http.url", "REDACTED"))

4. Integrate OpenCensus with FastAPI

Use the opencensus-ext-fastapi middleware to track requests and traces automatically.

Example Code:

from fastapi import FastAPI
from opencensus.ext.fastapi.middleware import OpenCensusMiddleware
from opencensus.ext.azure.trace_exporter import AzureExporter
from opencensus.trace.samplers import ProbabilitySampler

app = FastAPI()

# Configure middleware for OpenCensus tracing
app.add_middleware(
    OpenCensusMiddleware,
    exporter=AzureExporter(connection_string="InstrumentationKey=your_instrumentation_key"),
    sampler=ProbabilitySampler(1.0),  # Adjust sampling rate (1.0 = 100% of requests)
)

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "Hello, Application Insights!"}

5. Add Custom Logging

To log application-level events:

@app.get("/example")
async def example_endpoint():
    try:
        logger.info("Processing example endpoint")
        # Your logic here
        return {"message": "Success"}
    except Exception as e:
        logger.error("An error occurred", exc_info=True)
        raise e

6. Monitor Logs and Metrics in Application Insights
	•	Go to the Azure Portal > your Application Insights resource.
	•	Use the Log Analytics section to query logs (e.g., traces table).
	•	Use Live Metrics to observe real-time logs and telemetry.

7. Optional: Use Environment Variables

For better security, store your Instrumentation Key in an environment variable:

export APPINSIGHTS_INSTRUMENTATION_KEY=your_instrumentation_key

Update your configuration to read the key:

import os
INSTRUMENTATION_KEY = os.getenv("APPINSIGHTS_INSTRUMENTATION_KEY", "default_key")

This setup ensures that all requests, logs, and custom telemetry are sent to Application Insights for monitoring and analysis.