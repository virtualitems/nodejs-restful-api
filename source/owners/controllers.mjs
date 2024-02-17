/**
 * @fileoverview Controllers for the owners system (MVC architecture).
 */

import * as data from './data.mjs';


// GET owners/
export async function index(request, response) {
  const items = await data.all();
  const payload = JSON.stringify(items);
  response.send(payload);
}


// GET owners/{slug}
export async function show(request, response) {
  response.send('show');
}


// POST owners/{slug}
export async function store(request, response) {

  try {
    await data.create(request.body);
    response.status(201).send();

  } catch (error) {
    response.status(500).send(error.message);
  }

}


// PUT owners/{slug}
export async function update(request, response) {
  response.send('update');
}


// DELETE owners/{slug}
export async function destroy(request, response) {
  response.send('destroy');
}
