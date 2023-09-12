import dotenv from 'dotenv';
import path from 'path';

// Configuring dotenv
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debugging: Print the DB_URL to ensure it's being read correctly
console.log('DB_URL:', process.env.DB_URL);

import app from './app';

const PORT: string | number = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
