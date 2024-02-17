/**
 * @fileoverview Database queries and commands for the owners system.
 */

import { createDatabase } from '../adapters/sqlite3.mjs';


/**
 * Find all owners.
 * @return {Promise<Object[]>}
 */
export function all() {
  const database = createDatabase();
  const statement = 'SELECT * FROM owners;';
  return new Promise((resolve, reject) => {
    database.all(statement, (err, rows) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}
