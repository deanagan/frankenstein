import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import App from './App';

const server = setupServer(
  http.get('/WeatherForecast', (req, res, ctx) => {
    return res(
      ctx.json([
        { date: '2022-12-01', temperatureC: 10, summary: 'Warm' },
        { date: '2022-12-02', temperatureC: 20, summary: 'Hot' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders weather forecast', async () => {
  render(<App />);

  expect(screen.getByText(/weather forecast/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/2022-12-01/i)).toBeInTheDocument();
    expect(screen.getByText(/warm/i)).toBeInTheDocument();
    expect(screen.getByText(/10°C/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-12-02/i)).toBeInTheDocument();
    expect(screen.getByText(/hot/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
  });
});
