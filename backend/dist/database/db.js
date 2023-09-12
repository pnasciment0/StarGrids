"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.readRecord = exports.createRecord = exports.connectDB = void 0;
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const connectDB = () => {
    const dbUrl = process.env.DB_URL || '';
    if (!dbUrl) {
        throw new Error('Database URL is not provided.');
    }
    const pool = new pg_1.Pool({
        connectionString: dbUrl,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        }
        else {
            console.log('Connected to the database:', res.rows[0]);
        }
    });
    return pool;
};
exports.connectDB = connectDB;
const db = connectDB();
// Create
const createRecord = (tableName, record) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = Object.keys(record).join(", ");
    const values = Object.values(record);
    const placeholder = values.map((_, index) => `$${index + 1}`).join(", ");
    const queryText = `INSERT INTO ${tableName}(${fields}) VALUES(${placeholder}) RETURNING *;`;
    try {
        const res = yield db.query(queryText, values);
        return res;
    }
    catch (err) {
        throw new Error(`Failed to insert record: ${err}`);
    }
});
exports.createRecord = createRecord;
// Read
const readRecord = (tableName, condition, values) => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `SELECT * FROM ${tableName} WHERE ${condition};`;
    try {
        const res = yield db.query(queryText, values);
        return res;
    }
    catch (err) {
        throw new Error(`Failed to read record: ${err}`);
    }
});
exports.readRecord = readRecord;
// Update
const updateRecord = (tableName, updates, condition, values) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFields = Object.keys(updates).map((key, index) => `${key}=$${index + 1}`).join(", ");
    const queryText = `UPDATE ${tableName} SET ${updateFields} WHERE ${condition} RETURNING *;`;
    try {
        const res = yield db.query(queryText, [...Object.values(updates), ...values]);
        return res;
    }
    catch (err) {
        throw new Error(`Failed to update record: ${err}`);
    }
});
exports.updateRecord = updateRecord;
// Delete
const deleteRecord = (tableName, condition, values) => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `DELETE FROM ${tableName} WHERE ${condition} RETURNING *;`;
    try {
        const res = yield db.query(queryText, values);
        return res;
    }
    catch (err) {
        throw new Error(`Failed to delete record: ${err}`);
    }
});
exports.deleteRecord = deleteRecord;
