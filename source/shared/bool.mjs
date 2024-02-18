export function is(first, second) {
  return Object.is(first, second);
}

export function isNot(first, second) {
  return !Object.is(first, second);
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isNull(value) {
  return value === null;
}

export function isValuable(value) {
  return value !== null && value !== undefined && !Object.is(value, NaN);
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isBigInt(value) {
  return typeof value === 'bigint';
}

export function isString(value) {
  return typeof value === 'string';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  return typeof value === 'object';
}
