/**
 * Returns if two objects have equal values given the keys found in [originalObject]
 * @param originalObject The original object to comapre.
 * This object determines which keys will be compared
 * @param responseObject The comparison object. Additional attributes
 * found in this object will not be compared
 * @param exclude An array of string key values that will be skipped when checking for equality
 * @returns [true] or [false] depending if objects are partially equal
 */

function objectsEqual<T>(originalObject: T, responseObject: T, exclude?: string[]) : boolean {
  const keys = Object.keys(originalObject);
  const valuesOriginal = new Map(Object.entries(originalObject));
  const valuesResponse = new Map(Object.entries(responseObject));
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const skip = exclude.find((element) => element === key);
    if (!skip) {
      const value1 = JSON.stringify(valuesOriginal.get(key));
      const value2 = JSON.stringify(valuesResponse.get(key));
      if (value1 !== value2) {
        console.log('NOT EQUAL');
        console.log(`${key}`);
        console.log(`${value1} != ${value2}`);
        return false;
      }
    }
  }
  return true;
}

export default objectsEqual;
