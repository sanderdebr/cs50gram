import Component from '../lib/component';
import store from '../store/index';

export default class List extends Component {
  constructor(parent) {
    super({
      store,
      parent,
      element: {
        type: 'div',
        class: 'js-items',
      },
    });
  }

  render() {
    if (store.state.items.length === 0) {
      this.element.innerHTML = `<p>You've done nothing yet.</p>`;
      return;
    }

    this.element.innerHTML = `<ul>${store.state.items
      .map(
        (item) =>
          `<li>${item}<button aria-label="Delete this item">x</button></li>`
      )
      .join('')}</ul>`;

    this.element
      .querySelectorAll('button')
      .forEach((button, index) => {
        button.addEventListener('click', () => {
          store.dispatch('clearItem', { index });
        });
      });
  }
}
