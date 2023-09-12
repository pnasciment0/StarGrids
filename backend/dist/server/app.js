"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../database/db"); // Adjusted the path
const categories_1 = __importDefault(require("./routes/categories"));
const movies_1 = __importDefault(require("./routes/movies"));
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.connectDB)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API routes
app.use('/api/categories', categories_1.default);
app.use('/api/movies', movies_1.default);
exports.default = app;
