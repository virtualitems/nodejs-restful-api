/**
 * @fileoverview Express application adapter.
 * @requires express
 */

import expresslib from 'express';


export const express = expresslib;


class Server {
  constructor() {
    this.application = expresslib();
  }

  install(installer) {
    installer.install(this.application);
  }

  use(...args) {
    this.application.use(...args);
  }

  listen(...args) {
    this.application.listen(...args);
  }
}


export class Installer {
  install() {
    throw new Error('Not implemented');
  }
}


export default new Server();
