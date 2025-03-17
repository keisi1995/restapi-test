import { GetCommand, QueryCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import DynamoDBService from "../config/dynamoDB";
import { Character } from "../models/character";
import { v4 as uuidv4 } from "uuid";

const client = DynamoDBService.getInstance().getClient();
const TABLE = "Cache";

export const findOneBy = async (filter: Record<string, any>): Promise<Character[] | null> => {
  if (!filter || Object.keys(filter).length === 0) {
    throw new Error("Debes proporcionar al menos un filtro.");
  }

  // Convertimos los filtros en expresiones para DynamoDB
  const filterKeys = Object.keys(filter);
  const KeyConditionExpression = filterKeys.map((key) => `${key} = :${key}`).join(" AND ");

  const ExpressionAttributeValues = filterKeys.reduce((acc, key) => {
    acc[`:${key}`] = filter[key];
    return acc;
  }, {} as Record<string, any>);
  
  const command = new QueryCommand({
    TableName: TABLE,
    IndexName: "IDCharacterIndex",
    KeyConditionExpression,
    ExpressionAttributeValues,
  });

  const response = await client.send(command);
  return response.Items as Character[];
};

export const findOne = async (): Promise<Character[]> =>  {
  const command = new ScanCommand({ 
    TableName: TABLE
  });

  const response = await client.send(command);
  return response.Items?.map(item => item as Character) ?? [];
}
  
export const create = async (character: Character): Promise<Character> => {
  const command = new PutCommand({
    TableName: TABLE,
    Item: { id: uuidv4(), date_created: new Date().toISOString(), ttl: (Math.floor(Date.now() / 1000) + 1800), ...character },
  });

  await client.send(command);
  return character;
};
