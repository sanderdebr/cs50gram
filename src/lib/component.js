/* eslint-disable func-names */

import Store from '../store/store';

export default class Component {
  constructor(props = {}) {
    this.render = this.render || function () {};
    this.parent = props.parent;
    this.props = props;

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () =>
        this.render()
      );
    }

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      const el = document.createElement(props.element.type);
      el.classList = props.element.class;
      this.element = el;
      this.render();
    }
  }

  mount() {
    this.parent.insertAdjacentElement('beforeend', this.element);
  }

  unmount() {
    this.parent.removeChild(this.element);
  }
}
