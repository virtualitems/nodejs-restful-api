/**
 * @fileoverview Entry point for the system.
 */

import fs from 'fs';

import server, { express } from './adapters/express.mjs';
import OwnersApp from './owners/installer.mjs';
import { createDatabase } from './adapters/sqlite3.mjs';


// constants
const port = 3000;


// setup express
server.use(express.json());
server.use(express.static('public'));
server.use('/media', express.static('media'));
server.use('/tmp', express.static('tmp'));

server.install(OwnersApp);


// setup database
const database = createDatabase();

const statements = [
  `CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT
  );`,

  `CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY,
    owner_id INTEGER,
    slug TEXT UNIQUE NOT NULL,
    name TEXT,
    value REAL,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
  );`,

];

database.serialize(() => {
  statements.forEach((statement) => {
    database.run(statement);
  });
});

database.close();


// setup directories
for (const dir of ['public', 'media', 'tmp']) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}


// run server
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
