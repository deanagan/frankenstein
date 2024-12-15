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