import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export default class DynamoDB {
  private static instance: DynamoDB;
  private client: DynamoDBDocumentClient;

  private constructor() {
    const dynamoDBClient = new DynamoDBClient({
      region: "us-east-1",
      // endpoint: "http://localhost:8001",
      // credentials: {
      //   accessKeyId: "fakeMyKeyId",
      //   secretAccessKey: "fakeSecretAccessKey",
      // },
    });

    this.client = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  public static getInstance(): DynamoDB {
    if (!DynamoDB.instance) {
      DynamoDB.instance = new DynamoDB();
    }
    return DynamoDB.instance;
  }

  public getClient(): DynamoDBDocumentClient {
    return this.client;
  }
};
