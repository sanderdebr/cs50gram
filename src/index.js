/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable new-cap */

import List from './components/List';
import Count from './components/Count';
import store from './store/index';

import Dashboard from './views/Dashboard';
import Login from './views/Login';

setTimeout(() => {
  store.dispatch('addItem', 'item');
}, 2000);

const listInstance = new List();
const countInstance = new Count();

listInstance.render();
countInstance.render();

const pathToRegex = (path) =>
  new RegExp(
    '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
  );

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const router = () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/login', view: Login },
    { path: '/dashboard/', view: Dashboard },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = view.getHtml();
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
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
