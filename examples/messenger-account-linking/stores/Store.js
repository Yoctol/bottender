/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of fbsamples/messenger-bot-samples.
 */

/**
 * Base store class built around ES6 Weak Map
 * @export
 * @class Store
 */
module.exports = class Store {
  constructor() {
    this.data = new Map();
  }

  /**
   * Get item in store by case insensitive id
   *
   * @param {String} id Unique key for retrieval
   * @returns {Object} Value found in store
   */
  get(id) {
    return this.data.get(id.toLowerCase());
  }

  /**
   * Set item in store by case insensitive id
   *
   * @param {String} id Unique key for retrieval
   * @param {Object} value Object to add to store
   * @returns {Object} Value set in store
   */
  set(id, value) {
    return this.data.set(id.toLowerCase(), value);
  }

  /**
   * Check if item in store by case insensitive id
   *
   * @param {String} id Unique key for retrieval
   * @returns {Boolean} true found in store
   */
  has(id) {
    return this.data.has(id.toLowerCase());
  }

  /**
   * Delete item in store by case insensitive id
   *
   * @param {String} id Unique key for retrieval
   * @returns {Object} deleted object
   */
  delete(id) {
    const deleted = this.get(id);
    this.data.delete(id);
    return { deleted };
  }

  /**
   * Check if item in store by case insensitive id
   *
   * @returns {Object} instance of class
   */
  reset() {
    this.data.clear();
    return this;
  }
};
