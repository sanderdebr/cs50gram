/* eslint-disable no-restricted-globals */

import router from './router';

// setInterval(() => {
//   store.dispatch('addItem', 'item');
// }, 2000);

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
