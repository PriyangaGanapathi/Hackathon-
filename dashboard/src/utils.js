// utils is a library of generic helper functions 

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
export function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Determine if a value is a FormData object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a FormData object, otherwise false
 */
export function isFormData(val) {
	return typeof FormData !== 'undefined' && val instanceof FormData;
}
