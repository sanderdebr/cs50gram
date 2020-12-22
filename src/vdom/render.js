/* eslint-disable */

const renderElem = ({ tagName, attrs, children }) => {
  // Create the element
  const $el = document.createElement(tagName);

  // Add all atributes
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // Append all children recursively
  for (const child of children) {
    $el.appendChild(render(child));
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export default render;
