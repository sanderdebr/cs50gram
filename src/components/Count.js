import Component from '../lib/component';
import store from '../store/index';

export default class Count extends Component {
  constructor(parent) {
    super({
      store,
      parent,
      element: {
        type: 'div',
        class: 'js-count',
      },
    });
  }

  render() {
    const suffix = store.state.items.length !== 1 ? 's' : '';
    const emoji =
      store.state.items.length > 0 ? '&#x1f64c;' : '&#x1f622;';

    this.element.innerHTML = `
          <small>You've done</small>
          ${store.state.items.length}
          <small>thing${suffix} today ${emoji}</small>
        `;

    return null;
  }
}
