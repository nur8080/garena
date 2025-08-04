import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'garena-gears';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI, {});
  cachedClient = client;

  try {
      await client.connect();
      const db = client.db(MONGODB_DB);
      cachedDb = db;
      return db;
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Failed to connect to the database");
  }
}
