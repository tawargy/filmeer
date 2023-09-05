import { SqlDataStore } from './sql';

export let db: SqlDataStore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}
