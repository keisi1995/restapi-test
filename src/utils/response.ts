export const response = (statusCode: number, body: any) => {
  return { statusCode, body: JSON.stringify(body) };
};

export const errorResponse = (statusCode: number, message: String, errorDescription: string) => {
  return {
    statusCode,
    body: JSON.stringify({ message, errorDescription }),
  }; 
}