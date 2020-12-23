/* eslint-disable prefer-template */

import Utils from './services/Utils';

import Navbar from './views/components/Navbar';
import Footer from './views/components/Footer';

import Home from './views/pages/Home';
import Post from './views/pages/Post';
import Register from './views/pages/Register';
import Error404 from './views/pages/Error404';

import Test from './views/pages/Test';
import Test2 from './views/pages/Test2';
import store from './store/index';

const routes = {
  '/': Home,
  '/post/:id': Post,
  '/test': Test,
  '/test2': Test2,
  '/register': Register,
};

const router = async () => {
  // Lazy load element
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('page');
  const footer = null || document.getElementById('footer');

  // Render the header and footer
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Get the parsed URL from addressbar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an ID, change it with the string ":id"
  const parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  // Get the page from our hash of supported routes

  const Page = routes[parsedURL] ? routes[parsedURL] : Error404;

  const pageInstance = new Page();

  // Render first instance
  content.innerHTML = await pageInstance.render();

  // Refresh content.innerHTML on every state change
  store.events.subscribe('stateChange', async () => {
    content.innerHTML = await pageInstance.render();
  });

  await pageInstance.afterRender();
};

export default router;
