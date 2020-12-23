/* eslint-disable */

import Component from '../../lib/component';
import Count from '../../components/Count';
import store from '../../store/index';

export default class Test extends Component {
  constructor() {
    super({ store });

    this.countInstance = new Count();
  }

  async render() {
    const countHTML = this.countInstance.render();
    return `${countHTML}`;
  }

  async afterRender() {
    store.dispatch('addPost', 'example');
    return null;
  }
}
