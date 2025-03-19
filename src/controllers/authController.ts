import { APIGatewayProxyHandler } from 'aws-lambda';
import * as serviceAuth from "../services/auth.service";
import { response, errorResponse } from "../utils/response"
 
export const register: APIGatewayProxyHandler = async (event) => {
  try {    
    if (!event.body) {
      throw new Error("No hay data para registrar")
    }

    const data = JSON.parse(event.body);
    const character = await serviceAuth.register(data);

    return response(201, character);
  } catch (error) {   
    return errorResponse(500, "Error interno", error.message);
  }
};

export const login: APIGatewayProxyHandler = async (event) => {
  try {    
    if (!event.body) {
      throw new Error("No hay data para consultar")
    }

    const data = JSON.parse(event.body);
    const login = await serviceAuth.login(data);

    return response(201, login);
  } catch (error) {   
    return errorResponse(500, "Error interno", error.message);
  }
};
