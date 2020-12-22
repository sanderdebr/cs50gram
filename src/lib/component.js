/* eslint-disable func-names */

import Store from '../store/store';

export default class Component {
  constructor(props = {}) {
    this.render = this.render || function () {};

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () =>
        this.render()
      );
    }

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element;
    }
  }
}
