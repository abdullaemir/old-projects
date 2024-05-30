import compareArrays from "./compareArray.js";

/**
 * Compare Objects
 * @function compareObjects
 * @param {Array} a
 * @param {Array} b
 * @param {boolean} minusSign
 * @param {boolean} gaps
 * @return {boolean}
 */
export default function compareObjects(a, b, minusSign = false, gaps = true) {
  // if both are objects, then do a deep comparison of all properties
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    let prop;
    if (!compareArrays(aKeys, bKeys)) {
      return false;
    }
    // here we know the two objects have the same keys, check values now
    for (let i = 0; i < aKeys.length; i++) {
      prop = aKeys[i];
      if (typeof a[prop] === "object" && typeof b[prop] === "object") {
        if (!compareObjects(a[prop], b[prop])) {
          return false;
        }
      } else if (a.constructor === Array) {
        if (!a.includes(b[prop])) {
          return false;
        }
      } else {
        let reg = "";
        switch (minusSign) {
          case false:
            reg = gaps ? /\s/gu : "";
            break;
          case true:
            reg = gaps ? /-|\s/gu : /-/gu;
            break;
          default:
            break;
        }
        if (String(a[prop]).replace(reg, "") !== String(b[prop]).replace(reg, "")) {
          return false;
        }
      }
    }
    return true;
  } else {
    // not both objects so just do straight equality
    return a === b;
  }
}
