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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../database/db");
const router = (0, express_1.Router)();
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield (0, db_1.createRecord)('movies', req.body);
        res.json(record.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Add more routes for read, update, delete, etc.
exports.default = router;
