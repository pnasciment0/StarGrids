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
const db_1 = require("../../db");
const router = (0, express_1.Router)();
// Create
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield (0, db_1.createRecord)('categories', req.body);
        res.json(record.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Read
router.get('/read', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condition = 'id = $1'; // Replace with the condition you'd like to use
        const values = [req.query.id]; // Replace with the values you'd like to use
        const record = yield (0, db_1.readRecord)('categories', condition, values);
        res.json(record.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Update
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body.updates; // Replace with the updates you'd like to make
        const condition = 'id = $1'; // Replace with the condition you'd like to use
        const values = [req.query.id]; // Replace with the values you'd like to use
        const record = yield (0, db_1.updateRecord)('categories', updates, condition, values);
        res.json(record.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Delete
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const condition = 'id = $1'; // Replace with the condition you'd like to use
        const values = [req.query.id]; // Replace with the values you'd like to use
        const record = yield (0, db_1.deleteRecord)('categories', condition, values);
        res.json(record.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
