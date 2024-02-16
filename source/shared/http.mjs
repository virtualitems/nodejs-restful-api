/**
 * @fileoverview HTTP utilities.
 */
'use strict';


export function route(path, namespace=null, version=null) {

  if (typeof path !== 'string' || path.length === 0) {
    throw new Error('path must be a non-empty string');
  }

  let result = '';

  if (version) {
    result += `/${version}`;
  }

  if (namespace) {
    result += `/${namespace}`;
  }

  result += path[0] === '/' ? path : `/${path}`

  return result;
}


export function createResponseObject(message='', data=null, error=null) {
  return {
    message: message,
    data: data,
    error: error
  };
}
