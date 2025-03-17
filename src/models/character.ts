
export interface Weather {
  main: string,
  temp: number,
  description: string,
  icon: string,
}

export interface Planet {
  name: string,
  rotation_period: string, 
  orbital_period: string, 
  diameter: string, 
  climate: string, 
  gravity: string, 
  terrain: string, 
  surface_water: string, 
  population: string,
  weather: Weather
}

export interface Character {
  id?: string,
  id_character: string,
  name: string,
  height: string, 
  mass: string, 
  hair_color: string, 
  skin_color: string, 
  eye_color: string, 
  birth_year: string, 
  gender: string,
  homeworld: string,
  planet: Planet,
  date_created?: string,
  ttl?: string
}