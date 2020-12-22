/* eslint-disable class-methods-use-this */

import AbstractView from './AbstractView';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Login');
  }

  getHtml() {
    return `
            <h1>Login</h1>
        `;
  }
}
