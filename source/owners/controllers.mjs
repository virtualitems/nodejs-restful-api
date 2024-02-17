/**
 * @fileoverview Controllers for the owners system (MVC architecture).
 */

import * as data from './data.mjs';
import { createResponseObject } from '../shared/http.mjs';


// GET owners/
export async function index(request, response) {
  const items = await data.all();
  const payload = createResponseObject('success', items);
  response.send(payload);
}


// GET owners/{slug}
export async function show(request, response) {
  const item = await data.filter(request.params);

  if (item === undefined) {
    response.status(404).send();
    return;
  }

  const payload = createResponseObject('success', item);
  response.send(payload);
}


// POST owners/{slug}
export async function store(request, response) {

  try {
    await data.create(request.body);
    response.status(201).send();

  } catch (error) {
    const payload = createResponseObject('error', null, error.message);
    response.status(500).send(payload);
  }

}


// PUT owners/{slug}
export async function update(request, response) {

  try {
    const model = request.params;

    const item = await data.filter(model);

    if (item === undefined) {
      response.status(404).send();
      return;
    }

    await data.update(model, request.body);
    response.status(204).send();

  } catch (error) {
    const payload = createResponseObject('error', null, error.message);
    response.status(500).send(payload);
  }

}


// DELETE owners/{slug}
export async function destroy(request, response) {

  try {
    const model = request.params;

    const item = await data.filter(model);

    if (item === undefined) {
      response.status(404).send();
      return;
    }

    await data.remove(model);
    response.status(204).send();

  } catch (error) {
    const payload = createResponseObject('error', null, error.message);
    response.status(500).send(payload);
  }

}
