import Component from '../lib/component';
import store from '../store/index';

export default class Post extends Component {
  constructor(parent) {
    super({
      store,
      parent,
      element: {
        type: 'div',
        attrs: {
          class: 'js-post',
        },
      },
    });
  }

  render() {
    if (store.state.posts.length === 0) {
      this.element.innerHTML = `<p>You've done nothing yet.</p>`;
      return;
    }

    this.element.innerHTML = `<ul>${store.state.posts
      .map(
        (post) =>
          `<li>${post}<button aria-label="Delete this post">x</button></li>`
      )
      .join('')}</ul>`;

    this.element
      .querySelectorAll('button')
      .forEach((button, index) => {
        button.addEventListener('click', () => {
          store.dispatch('clearPost', { index });
        });
      });

    return this.element.outerHTML;
  }
}
