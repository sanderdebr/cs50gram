/* eslint-disable prefer-destructuring */

const Utils = {
  // Parse URL and break it into resource, id and verb
  parseRequestURL: () => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // Creates element and adds attributes to it
  createDOMElement: ({ type = 'div', attrs = {} }) => {
    const el = document.createElement(type);
    Object.entries(attrs).forEach(([key, value]) =>
      el.setAttribute(key, value)
    );
    return el;
  },
};

export default Utils;
