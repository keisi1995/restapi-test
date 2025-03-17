import { Character } from '../models/character'

export const mapperToList = (log: Character): Character => {     
  return {
    id:  log.id || '',
    id_character: log.id_character || '',
    name: log.name || '',
    height: log.height || '',
    mass: log.mass || '',
    hair_color: log.hair_color || '',
    skin_color: log.skin_color || '',
    eye_color: log.eye_color || '',
    birth_year: log.birth_year || '',
    gender: log.gender || '',
    homeworld: log.homeworld || '',
    planet: {
        name: log.planet?.name || '',
        rotation_period: log.planet?.rotation_period || '',
        orbital_period: log.planet?.orbital_period || '',
        diameter: log.planet?.diameter || '',
        climate: log.planet?.climate || '',
        gravity: log.planet?.gravity || '',
        terrain: log.planet?.terrain || '',
        surface_water: log.planet?.surface_water || '',
        population: log.planet?.population || '',
        weather: {
          main: log.planet?.weather.main || '',
          temp: log.planet?.weather.temp || 0,
          description: log.planet?.weather.description || '',
          icon: log.planet?.weather.icon || '',          
        }
    },
    date_created: log.date_created || ''
  };
} 

export const mapperToSave = (log: Character): Character => {     
  return {
    id_character: log.id_character || '',
    name: log.name || '',
    height: log.height || '',
    mass: log.mass || '',
    hair_color: log.hair_color || '',
    skin_color: log.skin_color || '',
    eye_color: log.eye_color || '',
    birth_year: log.birth_year || '',
    gender: log.gender || '',
    homeworld: log.homeworld || '',
    planet: {
        name: log.planet?.name || '',
        rotation_period: log.planet?.rotation_period || '',
        orbital_period: log.planet?.orbital_period || '',
        diameter: log.planet?.diameter || '',
        climate: log.planet?.climate || '',
        gravity: log.planet?.gravity || '',
        terrain: log.planet?.terrain || '',
        surface_water: log.planet?.surface_water || '',
        population: log.planet?.population || '',
        weather: {
          main: log.planet?.weather.main || '',
          temp: log.planet?.weather.temp || 0,
          description: log.planet?.weather.description || '',
          icon: log.planet?.weather.icon || '',          
        }
    }
  };
} 