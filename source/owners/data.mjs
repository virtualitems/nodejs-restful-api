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


/**
 * Create a new owner.
 * @param {Object} model
 * @param {string} model.slug
 * @param {string} model.name
 * @return {Promise}
 */
export function create(model) {
  const database = createDatabase();
  const statement = 'INSERT INTO owners (slug, name) VALUES (?, ?);';
  return new Promise((resolve, reject) => {
    database.run(statement, [model.slug, model.name], (err) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
