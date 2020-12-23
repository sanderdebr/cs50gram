/* eslint-disable */

import Component from '../../lib/component';
import Count from '../../components/Count';
import Post from '../../components/Post';
import store from '../../store/index';

export default class Test2 extends Component {
  constructor() {
    super({ store });

    this.countInstance = new Count();
    this.postInstance = new Post();
  }

  async render() {
    const countHTML = this.countInstance.render();
    const postHTML = this.postInstance.render();
    return `${postHTML} <hr /> ${countHTML}`;
  }

  async afterRender() {
    // setInterval(() => {
    //   store.dispatch('addPost', 'example');
    // }, 1000);
    return null;
  }
}
