/**
 * Compare Arrays
 * @function compareArrays
 * @param {Array} a
 * @param {Array} b
 * @return {boolean}
 */
export default function compareArrays(a, b) {
  if (typeof a.length === "number" && a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (!b.includes(a[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
}
