/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import PubSub from '../lib/pubsub';

export default class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new PubSub();

    if (Object.prototype.hasOwnProperty.call(params, 'actions')) {
      this.actions = params.actions;
    }

    if (Object.prototype.hasOwnProperty.call(params, 'mutations')) {
      this.mutations = params.mutations;
    }

    // Set gets called on every mutation
    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);
        this.events.publish('stateChange', this.state);
        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }
        this.status = 'resting';

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action ${actionKey} does not exists.`);
      return false;
    }

    // Dispatch action e.g. addItem on this object = the store
    // Performs a commit with payload as the value of the item
    console.groupCollapsed(`ACTION: ${actionKey}`);
    this.status = 'action';
    this.actions[actionKey](this, payload);
    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.actions[mutationKey] !== 'function') {
      console.error(`Action ${mutationKey} does not exists.`);
      return false;
    }

    // Updates the state as a mutation, e.g. pushes an item to the state array
    this.status = 'mutation';
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
    return true;
  }
}
