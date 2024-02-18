/**
 * @fileoverview Database queries and commands for the owners system.
 */

import { createDatabase } from '../adapters/sqlite3.mjs';
import { isString } from '../shared/bool.mjs';


/**
 * Find all owners.
 * @return {Promise<Object[]>}
 */
export function all(extras = {}) {

  const {
    orderField,
    orderDirection,
    pageNumber,
    pageSize,
    query
  } = extras;

  const pageSizeConverted = Number(pageSize);
  const pageNumberConverted = Number(pageNumber);
  const validFields = ['slug', 'name'];
  const validDirections = ['asc', 'desc'];
  const dataBinds = [];
  const database = createDatabase();

  let statement = 'SELECT * FROM owners';

  if (isString(query)) {
    statement += ' WHERE name LIKE ? OR slug LIKE ?';
    dataBinds.push(`%${query}%`, `%${query}%`);
  }

  if (isString(orderField) && validFields.includes(orderField)) {
    statement += ` ORDER BY ${orderField}`;

    if (isString(orderDirection) && validDirections.includes(orderDirection)) {
      statement += ` ${orderDirection}`;

    }
  }

  if (pageSizeConverted && pageSizeConverted >= 0) {

    if (Number(pageNumberConverted) && pageNumberConverted >= 0) {
      statement += ` LIMIT ${pageSize} OFFSET ${(pageNumber - 1) * pageSize}`;

    } else {
      statement += ` LIMIT ${pageSize}`;

    }

  }

  statement += ';';

  return new Promise((resolve, reject) => {
    database.all(statement, dataBinds, (err, rows) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}


/**
 * Find an owner by slug.
 * @param {Object} model
 * @param {string} model.slug
 * @param {string} model.name
 * @return {Promise<Object>}
 */
export function filter(model) {
  const database = createDatabase();

  let statement = 'SELECT * FROM owners';

  if (model.slug && model.name) {
    statement += ' WHERE slug = ? AND name = ?;';

  } else if (model.slug) {
    statement += ' WHERE slug = ?;';

  } else if (model.name) {
    statement += ' WHERE name = ?;';

  } else {
    statement += ';';

  }

  return new Promise((resolve, reject) => {
    database.get(statement, [model.slug, model.name], (err, row) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve(row);
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


/**
 * Update an owner by slug.
 * @param {Object} target
 * @param {Object} model
 * @param {string} model.slug
 * @param {string} model.name
 */
export function update(target, model) {
  const database = createDatabase();
  const statement = 'UPDATE owners SET name = ? WHERE slug = ?;';
  return new Promise((resolve, reject) => {
    database.run(statement, [model.name, target.slug], (err) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}


/**
 * Delete an owner by slug.
 * @param {Object} model
 * @param {string} model.slug
 * @return {Promise}
 */
export function remove(model) {
  const database = createDatabase();
  const statement = 'DELETE FROM owners WHERE slug = ?;';

  return new Promise((resolve, reject) => {
    database.run(statement, [model.slug], (err) => {
      database.close();
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
