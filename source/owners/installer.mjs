/**
 * @fileoverview Express application builder for the owners system.
 */

import { Installer } from '../adapters/express.mjs';
import { route } from '../shared/http.mjs';
import * as controllers from './controllers.mjs';
import urls from './urls.mjs';


const version = 'v1';
const namespace = 'owners';


class OwnersInstaller extends Installer {
  /**
   * Attaches the owners system to the application.
   * @param {import('express').Express} application
   */
  install(application) {
    application.get(route(urls.index, namespace, version), controllers.index);
    application.post(route(urls.index, namespace, version), controllers.store);
    application.get(route(urls.pointer, namespace, version), controllers.show);
    application.put(route(urls.pointer, namespace, version), controllers.update);
    application.delete(route(urls.pointer, namespace, version), controllers.destroy);
  }

  statements() {
    return [
      `CREATE TABLE IF NOT EXISTS resources_owners (
        id INTEGER PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT
      );`
    ];
  }

}


export default new OwnersInstaller();
