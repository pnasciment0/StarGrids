import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = (): Pool => {
  const dbUrl: string = process.env.DB_URL || '';

  if (!dbUrl) {
    throw new Error('Database URL is not provided.');
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return pool;
};

const db = connectDB();

// Create
const createRecord = async (tableName: string, record: Record<string, any>): Promise<QueryResult<any>> => {
  const fields = Object.keys(record).join(", ");
  const values = Object.values(record);
  const placeholder = values.map((_, index) => `$${index + 1}`).join(", ");
  
  const queryText = `INSERT INTO ${tableName}(${fields}) VALUES(${placeholder}) RETURNING *;`;

  try {
    const res = await db.query(queryText, values);
    return res;
  } catch (err) {
    throw new Error(`Failed to insert record: ${err}`);
  }
};

// Read
const readRecord = async (tableName: string, condition: string, values: any[]): Promise<QueryResult<any>> => {
  const queryText = `SELECT * FROM ${tableName} WHERE ${condition};`;

  try {
    const res = await db.query(queryText, values);
    return res;
  } catch (err) {
    throw new Error(`Failed to read record: ${err}`);
  }
};

// Update
const updateRecord = async (tableName: string, updates: Record<string, any>, condition: string, values: any[]): Promise<QueryResult<any>> => {
  const updateFields = Object.keys(updates).map((key, index) => `${key}=$${index + 1}`).join(", ");
  const queryText = `UPDATE ${tableName} SET ${updateFields} WHERE ${condition} RETURNING *;`;

  try {
    const res = await db.query(queryText, [...Object.values(updates), ...values]);
    return res;
  } catch (err) {
    throw new Error(`Failed to update record: ${err}`);
  }
};

// Delete
const deleteRecord = async (tableName: string, condition: string, values: any[]): Promise<QueryResult<any>> => {
  const queryText = `DELETE FROM ${tableName} WHERE ${condition} RETURNING *;`;

  try {
    const res = await db.query(queryText, values);
    return res;
  } catch (err) {
    throw new Error(`Failed to delete record: ${err}`);
  }
};

export { connectDB, createRecord, readRecord, updateRecord, deleteRecord };
