"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.readRecord = exports.createRecord = exports.connectDB = void 0;
var pg_1 = require("pg");
var dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
var connectDB = function () {
    var dbUrl = process.env.DB_URL || '';
    if (!dbUrl) {
        throw new Error('Database URL is not provided.');
    }
    var pool = new pg_1.Pool({
        connectionString: dbUrl,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    pool.query('SELECT NOW()', function (err, res) {
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
var db = connectDB();
// Create
var createRecord = function (tableName, record) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, values, placeholder, queryText, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = Object.keys(record).join(", ");
                values = Object.values(record);
                placeholder = values.map(function (_, index) { return "$".concat(index + 1); }).join(", ");
                queryText = "INSERT INTO ".concat(tableName, "(").concat(fields, ") VALUES(").concat(placeholder, ") RETURNING *;");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(queryText, values)];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
            case 3:
                err_1 = _a.sent();
                throw new Error("Failed to insert record: ".concat(err_1));
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createRecord = createRecord;
// Read
var readRecord = function (tableName, condition, values) { return __awaiter(void 0, void 0, void 0, function () {
    var queryText, res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryText = "SELECT * FROM ".concat(tableName, " WHERE ").concat(condition, ";");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(queryText, values)];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
            case 3:
                err_2 = _a.sent();
                throw new Error("Failed to read record: ".concat(err_2));
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.readRecord = readRecord;
// Update
var updateRecord = function (tableName, updates, condition, values) { return __awaiter(void 0, void 0, void 0, function () {
    var updateFields, queryText, res, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateFields = Object.keys(updates).map(function (key, index) { return "".concat(key, "=$").concat(index + 1); }).join(", ");
                queryText = "UPDATE ".concat(tableName, " SET ").concat(updateFields, " WHERE ").concat(condition, " RETURNING *;");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(queryText, __spreadArray(__spreadArray([], Object.values(updates), true), values, true))];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
            case 3:
                err_3 = _a.sent();
                throw new Error("Failed to update record: ".concat(err_3));
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateRecord = updateRecord;
// Delete
var deleteRecord = function (tableName, condition, values) { return __awaiter(void 0, void 0, void 0, function () {
    var queryText, res, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryText = "DELETE FROM ".concat(tableName, " WHERE ").concat(condition, " RETURNING *;");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query(queryText, values)];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
            case 3:
                err_4 = _a.sent();
                throw new Error("Failed to delete record: ".concat(err_4));
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteRecord = deleteRecord;
