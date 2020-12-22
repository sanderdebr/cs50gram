/* eslint-disable class-methods-use-this */

export default class AbstractView {
  constructor() {
    this.wrapper = document.getElementById('wrapper');
  }

  setTitle(title) {
    document.title = title;
  }

  async mountPage() {
    return '';
  }
}
