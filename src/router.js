/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */

import Dashboard from './views/Dashboard';
import Login from './views/Login';

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

const router = async () => {
  const routes = [
    { path: '/', View: Dashboard },
    { path: '/login', View: Login },
    { path: '/dashboard/', View: Dashboard },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [window.location.pathname],
    };
  }

  const newView = new match.route.View(getParams(match));

  // Unmount current page

  // Mount new page
  await newView.mountPage();
};

export default router;
