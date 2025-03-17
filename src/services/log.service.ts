import * as repositoryLog from "../repositories/log.repository";
import * as repositoryCache from "../repositories/cache.repository";
import { StarWarsAPI } from "../api/starwars.api";
import { WeatherAPI } from "../api/weather.api";
import { Character, Planet, Weather } from "../models/character";
import { mapperToList, mapperToSave } from "../mappers/log.mapper";

export const register = async (data: Character) => {  
  const dataFormat = mapperToSave(data);
  return await repositoryLog.create(dataFormat);
}

export const registerMerged = async (characterId: string) => {
    const cachedData = await repositoryCache.findOneBy({id_character: characterId});

    if (cachedData && cachedData.length > 0) {
      return mapperToList(cachedData[0]);
    }

    const characterData = await StarWarsAPI.getCharacter(characterId);
    const planetData = await StarWarsAPI.getPlanet(characterData.homeworld);
    const weatherData = await WeatherAPI.getWeather(planetData.name);

    const weatherObj: Weather = { main: weatherData.weather[0].main, temp: Number(weatherData.main.temp), description: weatherData.weather[0].description, icon: weatherData.weather[0].icon}
  
    const planetObj: Planet = { name: planetData.name, rotation_period: planetData.rotation_period, orbital_period: planetData.orbital_period,
      diameter: planetData.diameter, climate: planetData.climate, gravity: planetData.gravity, terrain: planetData.terrain,
      surface_water: planetData.surface_water, population: planetData.population, weather: weatherObj
    }
    
    const characterObj: Character = { id_character: characterId, name: characterData.name, height: characterData.height, mass: characterData.mass, 
      hair_color: characterData.hair_color, skin_color: characterData.skin_color, eye_color: characterData.eye_color, 
      birth_year: characterData.birth_year, gender: characterData.gender, homeworld: characterData.homeworld, planet: planetObj      
    };

    await repositoryCache.create(characterObj);
    return await repositoryLog.create(characterObj);
};

export const getAll = async () => {
  const logs = await repositoryLog.findOne();
  return logs.map(log => mapperToList(log));
};
