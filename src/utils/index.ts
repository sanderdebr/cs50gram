// Checks if object is empty except for a field
export const isEmpty = (obj, exception) =>
  Object.keys(obj).filter((key) => key !== exception).length === 0

// Fetch only allowed if authenticated
export const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

// Format string for JSON parsing
export const formatForJson = (str) => {
  // preserve newlines, etc - use valid JSON
  str = str
    .replace(/\\n/g, '\\n')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
    .replace(/\\b/g, '\\b')
    .replace(/\\f/g, '\\f')
  // remove non-printable and other non-valid JSON chars
  str = str.replace(/[\u0000-\u0019]+/g, '')
  return str
}
