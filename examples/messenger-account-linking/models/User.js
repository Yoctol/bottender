/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of fbsamples/messenger-bot-samples.
 */

/**
 * User Model
 * @class User
 */
module.exports = class User {
  constructor(username, password, messengerId) {
    this.username = username;
    this.password = password;
    this.messengerId = messengerId;
  }
};
