export function action(creator = () => ({})) {
  const result = (...args) => ({ type: result, ...creator(...args) });
  return result;
}
