/**
 * @fileoverview Controllers for the owners system (MVC architecture).
 */

// GET owners/
export function index(request, response) {
  response.send('index');
}


// GET owners/{slug}
export function show(request, response) {
  response.send('show');
}


// POST owners/{slug}
export function store(request, response) {
  response.send('store');
}


// PUT owners/{slug}
export function update(request, response) {
  response.send('update');
}


// DELETE owners/{slug}
export function destroy(request, response) {
  response.send('destroy');
}
