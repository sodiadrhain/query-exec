/**
 * Checks if an object data is empty and returns.
 * @param  {object} obj - The object to check.
 * @return {boolean} - The result.
 */
export const isEmptyObject = (obj: object): boolean => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const checkLimitInQuery = (query: string, limit = 1000) => {
  const limitPattern = /LIMIT\s+(\d+)/i;
  const match = query.match(limitPattern);

  // Check if a LIMIT clause is found and > limit value passed
  if (match && parseInt(match[1], 10) > limit) {
    return true;
  }

  return false;
};
