/**
 * Checks if an object data is empty and returns.
 * @param  {object} obj - The object to check.
 * @return {boolean} - The result.
 */
export const isEmptyObject = (obj: object): boolean => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
  };