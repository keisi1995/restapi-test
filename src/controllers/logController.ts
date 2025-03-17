import { APIGatewayProxyHandler } from 'aws-lambda';
import * as serviceLog from "../services/log.service";
import { response, errorResponse } from "../utils/response"

export const fusionados: APIGatewayProxyHandler = async (event) => {  
  try {
    const { id: characterId } = event.pathParameters || {};
    if (!characterId) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Character ID is required' }) };
    }

    const character = await serviceLog.registerMerged(characterId);
    
    return response(201, character);
  } catch (error) {    
    return errorResponse(500, "Error interno", error.message);
  }
};

export const almacenar: APIGatewayProxyHandler = async (event) => {
  try {    
    if (!event.body) {
      throw new Error("No hay data para registrar")
    }

    const data = JSON.parse(event.body);
    const character = await serviceLog.register(data);

    return response(201, character);
  } catch (error) {   
    return errorResponse(500, "Error interno", error.message);
  }
};

export const historial: APIGatewayProxyHandler = async () => {
  try {
    const logs = await serviceLog.getAll();
    
    return response(200, logs);
  } catch (error) {    
    return errorResponse(500, "Error interno", error.message);     
  }
};
