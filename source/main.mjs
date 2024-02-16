/**
 * @fileoverview Entry point for the system.
 */

import fs from 'fs';

import server, { express } from './adapters/express.mjs';
import OwnersApp from './owners/installer.mjs';


const port = 3000;


// setup express
server.use(express.json());
server.use(express.static('public'));
server.use('/media', express.static('media'));
server.use('/tmp', express.static('tmp'));

server.install(OwnersApp);
server.setupDatabase(OwnersApp.statements());


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
