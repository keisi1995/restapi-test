import axios from 'axios';

export class StarWarsAPI {
  private static API_URL = 'https://swapi.dev/api/people';

  static async getCharacter(id: string) {
    const response = await axios.get(`${this.API_URL}/${id}/`);
    return response.data;
  }

  static async getPlanet(apiURL: string) {
    const response = await axios.get(apiURL);
    return response.data;
  }
}
