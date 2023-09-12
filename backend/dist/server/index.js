"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Configuring dotenv
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Debugging: Print the DB_URL to ensure it's being read correctly
console.log('DB_URL:', process.env.DB_URL);
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8001;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
