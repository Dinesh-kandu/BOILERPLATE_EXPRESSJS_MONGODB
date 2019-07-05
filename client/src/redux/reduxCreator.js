export function makeConstantCreator(...params) {
  const constant = {};
  // eslint-disable-next-line no-return-assign
  params.map(param => (constant[param] = param));
  return constant;
}
