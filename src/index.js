import router from './router';

// Listen on hash change
window.addEventListener('hashchange', router);

// Listen on page load
window.addEventListener('load', router);
