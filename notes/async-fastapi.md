In a FastAPI application, if your async endpoint calls a blocking synchronous function (like a calculation API or any CPU-intensive task), the blocking operation can become a bottleneck. Here’s how you can handle this scenario specifically with FastAPI:

Why Is It a Problem?
	1.	Blocking the Event Loop:
FastAPI is built on top of asyncio, which uses an event loop to handle multiple requests concurrently. A synchronous function (blocking code) will block the event loop, preventing other requests from being served until the blocking operation completes.
	2.	Reduced Scalability:
If you’re serving multiple requests, a blocking operation will make your application appear slower and reduce concurrency.

Best Practices for Handling Blocking Code in FastAPI

1. Offload Blocking Code to a Thread with asyncio.to_thread

This is the simplest solution when you can’t avoid calling a synchronous function.

FastAPI supports async views, so you can use asyncio.to_thread to run blocking code in a separate thread without blocking the event loop.

import asyncio
import numpy as np
from fastapi import FastAPI

app = FastAPI()

class CalculationService:
    def heavy_calculation(self, data: list[float]) -> float:
        # Example of a synchronous blocking calculation
        array = np.array(data)
        return np.sum(array ** 2)

@app.post("/calculate")
async def calculate(data: list[float]):
    service = CalculationService()
    # Offload the blocking calculation to a separate thread
    result = await asyncio.to_thread(service.heavy_calculation, data)
    return {"result": result}

Why this works:
	•	asyncio.to_thread moves the blocking task to a thread in Python’s thread pool, allowing the event loop to continue handling other requests.

2. Use Background Tasks for Long-Running or Heavy Operations

If the operation is very time-consuming (e.g., large NumPy matrix operations), consider moving it to a background task queue, such as Celery.

Using FastAPI Background Tasks:
FastAPI provides a simple way to offload tasks to background workers.

from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

def heavy_calculation(data: list[float]):
    array = np.array(data)
    result = np.sum(array ** 2)
    print(f"Calculation result: {result}")
    return result

@app.post("/calculate")
async def calculate(data: list[float], background_tasks: BackgroundTasks):
    # Schedule the task as a background job
    background_tasks.add_task(heavy_calculation, data)
    return {"status": "Task scheduled"}

3. Use a Task Queue Like Celery for Distributed Processing

For CPU-intensive or long-running tasks, offloading to a dedicated worker system (like Celery with Redis or RabbitMQ) ensures that your API remains responsive.

Example:

from celery import Celery
from fastapi import FastAPI

app = FastAPI()
celery_app = Celery("tasks", broker="redis://localhost:6379/0")

@celery_app.task
def heavy_calculation(data):
    array = np.array(data)
    return np.sum(array ** 2)

@app.post("/calculate")
async def calculate(data: list[float]):
    # Send the task to Celery workers
    task = heavy_calculation.delay(data)
    return {"task_id": task.id}

In this setup:
	•	FastAPI remains lightweight and responsive.
	•	Celery processes the heavy computation in a separate worker.

4. Optimize Your Synchronous Code

If you must keep your code synchronous, ensure it is as fast as possible:
	•	Use NumPy or other vectorized libraries for computations.
	•	Precompute and cache results where possible (e.g., using Redis).
	•	Avoid global locks and shared mutable state.

Conclusion

If your async FastAPI endpoints call synchronous calculation functions:
	1.	For lightweight blocking tasks: Use asyncio.to_thread.
	2.	For heavy or long-running tasks: Use background tasks or task queues like Celery.
	3.	For better performance: Optimize synchronous code to reduce blocking time.

By following these practices, you can avoid bottlenecks while retaining the benefits of FastAPI’s async capabilities.