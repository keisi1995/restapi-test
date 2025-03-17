import axios from 'axios';

export class WeatherAPI {
  private static API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // los datos del planeta no coincide con los datos de esta API, es por lo que estoy colocando Lima directamente
  static async getWeather(city: string) {
    const response = await axios.get(this.API_URL, {
      params: {
        // q: city,
        q: "Lima",
        appid: 'd89c7d568f65ef1bee1dee17e3b503ec',
        units: 'metric',
      },
    });
    return response.data;
  }
}