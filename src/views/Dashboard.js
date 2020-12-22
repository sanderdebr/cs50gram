/* eslint-disable class-methods-use-this */

import AbstractView from './AbstractView';
import Count from '../components/Count';
import List from '../components/List';

export default class Dashboard extends AbstractView {
  constructor() {
    super();
    this.setTitle('Dashboard');

    this.listInstance = new List(this.wrapper);
    this.countInstance = new Count(this.wrapper);
  }

  async unMountPage() {
    this.listInstance.unmount();
    this.countInstance.unmount();
  }

  async mountPage() {
    this.listInstance.mount();
    this.countInstance.mount();
  }
}
