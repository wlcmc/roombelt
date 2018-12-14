const map = new Map();
let lastTokenId = 0;

/**
 * Generate cancellable token with support for grouping.
 * One can cancel tokens from the same group using `cancelOthers` and `cancelAll` functions
 * @param groupKey
 */
export default function(groupKey) {
  const tokenId = lastTokenId++;
  const tokenIds = map.get(groupKey) || [];

  tokenIds.push(tokenId);
  map.set(groupKey, tokenIds);

  const result = {
    isCancelled: () => tokenIds.indexOf(tokenId) === -1,
    cancel: () => {
      tokenIds.splice(tokenIds.indexOf(tokenId), 1);
      return result;
    },
    cancelOthers: () => {
      tokenIds.splice(0, tokenIds.length, tokenId);
      return result;
    },
    cancelAll: () => {
      tokenIds.splice(0, tokenIds.length);
      return result;
    }
  };
  return result;
}