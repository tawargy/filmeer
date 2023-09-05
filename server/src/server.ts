import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import app from './app';
import { initDb } from './datastore';
(async () => {
  await initDb();
  const PORT: string | number = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log('server is running');
  });
})();
