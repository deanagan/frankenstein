Here’s the remade tutorial with Docker integration to containerize the FastAPI calculator microservice.

1. Project Setup

Create a folder for your project:

mkdir fastapi_calculator && cd fastapi_calculator

Create the following structure:

fastapi_calculator/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── calculator.py
│   │   ├── health.py
│   ├── config.py
├── tests/
│   ├── test_calculator.py
│   ├── test_health.py
├── Dockerfile
├── requirements.txt
├── docker-compose.yml
├── .dockerignore

2. Application Code

2.1 Configuration

In app/config.py, define constants:

class Config:
    MULTIPLIER = 2
    OFFSET = 10

2.2 Calculator Router

In app/routers/calculator.py, define the logic:

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import Config

router = APIRouter()

class CalculationInput(BaseModel):
    value1: float
    value2: float
    value3: float
    value4: float
    value5: float

@router.post("/calculate", summary="Perform calculation")
async def calculate(input: CalculationInput):
    try:
        total = sum([input.value1, input.value2, input.value3, input.value4, input.value5])
        result = (total * Config.MULTIPLIER) + Config.OFFSET
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

2.3 Health Router

In app/routers/health.py, add a health check endpoint:

from fastapi import APIRouter

router = APIRouter()

@router.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok"}

2.4 Main Application

In app/main.py, register the routers:

from fastapi import FastAPI
from app.routers import calculator, health

app = FastAPI(title="Calculator Microservice", version="1.0.0")

app.include_router(health.router, prefix="/api")
app.include_router(calculator.router, prefix="/api")

3. Dependencies

Create requirements.txt:

fastapi
uvicorn

4. Docker Setup

4.1 Dockerfile

Create a Dockerfile to define the container image:

# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY . .

# Expose port 8000 and run the application
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

4.2 Docker Compose

Create docker-compose.yml to manage the container:

version: '3.8'

services:
  calculator:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"

4.3 Docker Ignore File

Create .dockerignore to exclude unnecessary files:

__pycache__/
*.pyc
*.pyo
*.pyd
*.log
*.env
tests/

5. Running the Application

Build and run the containerized app:

docker-compose up --build

Access the endpoints:
	•	POST /api/calculate
	•	GET /api/health

6. Unit Tests

Install pytest and httpx locally (not in Docker, to keep testing independent of the app container):

pip install pytest httpx

6.1 Test the Calculator

In tests/test_calculator.py:

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_calculate():
    response = client.post("/api/calculate", json={
        "value1": 1,
        "value2": 2,
        "value3": 3,
        "value4": 4,
        "value5": 5
    })
    assert response.status_code == 200
    assert response.json()["result"] == 50  # Example logic

6.2 Test the Health Check

In tests/test_health.py:

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

Run the tests:

pytest tests/

7. Testing in Docker

To run tests inside a containerized environment, modify docker-compose.yml:

services:
  calculator:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
  tests:
    build:
      context: .
      dockerfile: Dockerfile
    command: ["pytest", "tests/"]

Run the tests:

docker-compose up --build tests

8. Notes
	•	You can expand the Config class to load constants from environment variables using libraries like python-decouple.
	•	Use .env files for secret management if needed.
	•	In production, you can use a FastAPI server like Gunicorn or a cloud provider for deployment.

Let me know if you’d like to dive deeper into any part!