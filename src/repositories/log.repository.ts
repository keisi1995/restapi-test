import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import DynamoDBService from "../config/dynamoDB";
import { Character } from "../models/character";
import { v4 as uuidv4 } from "uuid";

const client = DynamoDBService.getInstance().getClient();
const TABLE = "Log";

export const findOneBy = async (id: string): Promise<Character | null> => {
  const command = new GetCommand({
    TableName: TABLE,
    Key: { id: id }
  });

  const response = await client.send(command);
  return response.Item as Character;
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
    Item: { id: uuidv4(), date_created: new Date().toISOString(), ...character },
  });

  await client.send(command);
  return character;
};
