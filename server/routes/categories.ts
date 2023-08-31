import { Router } from 'express';
import { createRecord, readRecord, updateRecord, deleteRecord } from '../../database/db';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const record = await createRecord('categories', req.body);
    res.json(record.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add more routes for read, update, delete, etc.

export default router;
