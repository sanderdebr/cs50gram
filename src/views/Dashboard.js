/* eslint-disable class-methods-use-this */

import AbstractView from './AbstractView';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Dashboard');
  }

  getHtml() {
    return `
            <h1>Dashboard</h1>
        `;
  }
}
