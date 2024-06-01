import React, { useEffect, useState } from 'react';
import './custom.css';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

function App() {
  const [data, setData] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    fetch('/WeatherForecast')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.date} - {item.summary} - {item.temperatureC}°C
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
