import { Router } from 'express';
import { createRecord, readRecord, updateRecord, deleteRecord } from '../../database/db';

const router = Router();

// Create
router.post('/create', async (req, res) => {
  try {
    const record = await createRecord('categories', req.body);
    res.json(record.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get('/read', async (req, res) => {
  try {
    const condition = 'id = $1'; // Replace with the condition you'd like to use
    const values = [req.query.id]; // Replace with the values you'd like to use
    const record = await readRecord('categories', condition, values);
    res.json(record.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/update', async (req, res) => {
  try {
    const updates = req.body.updates; // Replace with the updates you'd like to make
    const condition = 'id = $1'; // Replace with the condition you'd like to use
    const values = [req.query.id]; // Replace with the values you'd like to use
    const record = await updateRecord('categories', updates, condition, values);
    res.json(record.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/delete', async (req, res) => {
  try {
    const condition = 'id = $1'; // Replace with the condition you'd like to use
    const values = [req.query.id]; // Replace with the values you'd like to use
    const record = await deleteRecord('categories', condition, values);
    res.json(record.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
