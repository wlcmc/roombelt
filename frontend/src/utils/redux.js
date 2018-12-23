function getFieldName(object, value) {
  if (!object) return null;

  for (const field in object) {
    if (object.hasOwnProperty(field) && object[field] === value) return field;
  }

  return null;
}

export function action(creator = () => ({})) {
  let name = "unknown";

  function result(...args) {
    name = getFieldName(this, result) || name;
    return ({ type: result, ...creator(...args) });
  }

  result.toString = () => name;

  return result;
}
