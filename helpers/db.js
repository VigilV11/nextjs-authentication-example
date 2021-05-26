import { MongoClient } from 'mongodb';
import { MongoDBCredentials } from '../config';

export async function connectToDatabase() {
  const client = await MongoClient.connect(MongoDBCredentials);
  return client;
}
