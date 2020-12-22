/* eslint-disable class-methods-use-this */

import AbstractView from './AbstractView';

export default class Login extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Login');
  }

  async unMountPage() {
    return null;
  }

  async mountPage() {
    return `
            <h1>Login</h1>
        `;
  }
}
