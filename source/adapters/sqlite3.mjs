/**
 * @fileoverview Sqlite database adapter.
 * @requires express
 */

import sqlite3 from 'sqlite3';


export const sqlite = sqlite3.verbose();


const configurations = {
  dbname: 'resources.sqlite',
};


export function createDatabase() {
  return new sqlite3.Database(configurations.dbname);
};
