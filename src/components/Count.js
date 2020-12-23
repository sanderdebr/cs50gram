import Component from '../lib/component';
import store from '../store/index';

export default class Count extends Component {
  constructor() {
    super({
      store,
      element: {
        type: 'div',
        attrs: {
          classList: 'js-post',
          id: 'post5',
        },
      },
    });
  }

  render() {
    this.element.innerHTML = `Number of posts: ${store.state.posts.length}`;
    return this.element.outerHTML;
  }
}
