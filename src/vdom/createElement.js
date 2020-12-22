/* eslint-disable */

export default (
  tagName,
  { attrs = {}, children = [], store } = {}
) => {
  const vElem = Object.create(null);
  console.log('STORE', store);

  Object.assign(vElem, {
    tagName,
    attrs,
    children,
  });

  return vElem;
};
