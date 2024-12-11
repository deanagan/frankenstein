To implement a clean and maintainable way to calculate electricity usage based on your settings in FastAPI, you can use the Strategy Pattern. This pattern allows you to define a family of algorithms (calculation strategies) and make them interchangeable depending on your settings.

Here’s how you can structure it:

1. Define a Base Strategy Interface

Create a base class that defines the interface for all calculation strategies.

from abc import ABC, abstractmethod

class ElectricityCalculationStrategy(ABC):
    @abstractmethod
    def calculate(self, settings: dict, usage: float) -> float:
        pass

2. Implement Specific Strategies

Create separate classes for each calculation method based on the settings.

class ResidentialStrategy(ElectricityCalculationStrategy):
    def calculate(self, settings: dict, usage: float) -> float:
        # Example: flat rate per kWh
        rate = settings.get("rate_per_kwh", 0.15)
        return usage * rate

class CommercialStrategy(ElectricityCalculationStrategy):
    def calculate(self, settings: dict, usage: float) -> float:
        # Example: tiered rate
        if usage <= 100:
            rate = settings.get("tier1_rate", 0.12)
        else:
            rate = settings.get("tier2_rate", 0.10)
        return usage * rate

class IndustrialStrategy(ElectricityCalculationStrategy):
    def calculate(self, settings: dict, usage: float) -> float:
        # Example: demand charge + usage charge
        demand_charge = settings.get("demand_charge", 50)
        rate = settings.get("rate_per_kwh", 0.08)
        return demand_charge + (usage * rate)

3. Create a Factory or Mapper

Use a factory or dictionary to map settings to the appropriate strategy.

class ElectricityCalculator:
    _strategies = {
        "residential": ResidentialStrategy(),
        "commercial": CommercialStrategy(),
        "industrial": IndustrialStrategy(),
    }

    @staticmethod
    def get_strategy(setting_type: str) -> ElectricityCalculationStrategy:
        return ElectricityCalculator._strategies.get(setting_type, ResidentialStrategy())

4. Integrate Into FastAPI

Use the strategy in your FastAPI route.

from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.post("/calculate-electricity")
def calculate_electricity(settings: dict, usage: float):
    setting_type = settings.get("type", "residential")  # e.g., "residential", "commercial", "industrial"
    strategy = ElectricityCalculator.get_strategy(setting_type)
    if not strategy:
        raise HTTPException(status_code=400, detail="Invalid setting type")

    cost = strategy.calculate(settings, usage)
    return {"cost": cost}

5. Example Usage

Send a POST request with the settings and usage:

Request Body:

{
  "settings": {
    "type": "commercial",
    "tier1_rate": 0.12,
    "tier2_rate": 0.10
  },
  "usage": 150
}

Response:

{
  "cost": 15.0
}

Benefits:
	•	Separation of Concerns: Each calculation method is isolated in its own class.
	•	Scalability: Adding a new calculation strategy is easy—just add a new class and update the strategy map.
	•	Readability: The code is clean and easier to maintain.