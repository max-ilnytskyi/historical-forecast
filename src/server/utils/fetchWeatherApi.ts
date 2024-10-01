import axios from 'axios';

const url = 'https://historical-forecast-api.open-meteo.com/v1/forecast';

interface FetchWeatherApiOptions {
  params: {
    latitude: number;
    longitude: number;
    start_date: string;
    end_date: string;
    daily: string[];
  };
}

export function fetchWeatherApi({ params }: FetchWeatherApiOptions) {
  return axios.get(url, {
    params,
  });
}
