/* eslint-disable func-names */

import Store from '../store/store';
import Utils from '../services/Utils';

export default class Component {
  constructor(props = {}) {
    this.render = this.render || function () {};

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () =>
        this.render()
      );
    }

    // Create element and render it
    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = Utils.createDOMElement(props.element);
    }
  }
}
