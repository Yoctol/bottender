/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of fbsamples/messenger-bot-samples.
 */

// ===== MODULES ===============================================================
const express = require('express');
const uuid = require('uuid');

// ===== STORES ================================================================
const UserStore = require('../stores/UserStore');

const router = express.Router();

const linkAccountToMessenger = (res, username, redirectURI) => {
  /*
    The auth code can be any thing you can use to uniquely identify a user.
    Once the redirect below happens, this bot will receive an account link
    message containing this auth code allowing us to identify the user.

    NOTE: It is considered best practice to use a unique id instead of
    something guessable like a users username so that malicious
    users cannot spoof a link.
   */
  const authCode = uuid.v4();

  // set the messenger id of the user to the authCode.
  // this will be replaced on successful account link
  // with the users id.
  UserStore.linkMessengerAccount(username, authCode);

  // Redirect users to this URI on successful login
  const redirectURISuccess = `${redirectURI}&authorization_code=${authCode}`;

  res.redirect(redirectURISuccess);
};

/**
 * GET Create user account view
 */
router.get('/create', function(req, res) {
  const accountLinkingToken = req.query.account_linking_token;
  const redirectURI = req.query.redirect_uri;

  res.render('create-account', { accountLinkingToken, redirectURI });
});

/**
 * Create user account and link to messenger
 */
router.post('/create', function(req, res) {
  const { username, password, password2, redirectURI } = req.body;
  if (UserStore.has(username)) {
    res.render('create-account', {
      username,
      password,
      password2,
      redirectURI,
      errorMessage: `Sorry! '${username}' has already been taken.`,
      errorInput: 'username',
    });
  } else {
    UserStore.insert(username, password);

    if (redirectURI) {
      linkAccountToMessenger(res, username, redirectURI);
    } else {
      res.render('create-account-success', { username });
    }
  }
});

/*
 * This path is used for account linking. The account linking call-to-action
 * (sendAccountLinking) is pointed to this URL.
 *
 */
router.get('/login', function(req, res) {
  /*
    Account Linking Token is never used in this demo, however it is
    useful to know about this token in the context of account linking.

    It can be used in a query to the Graph API to get Facebook details
    for a user. Read More at:
    https://developers.facebook.com/docs/messenger-platform/account-linking
  */
  const accountLinkingToken = req.query.account_linking_token;

  const redirectURI = req.query.redirect_uri;

  res.render('login', { accountLinkingToken, redirectURI });
});

/**
 * User login route is used to authorize account_link actions
 */
router.post('/login', function(req, res) {
  const { username, password, redirectURI } = req.body;
  const userLogin = UserStore.get(username);
  if (!userLogin || userLogin.password !== password) {
    res.render('login', {
      redirectURI,
      username,
      password,
      errorMessage: !userLogin
        ? 'Uh oh. That username doesn’t exist. Please use the demo account or try again.' // eslint-disable-line max-len
        : 'Oops. Incorrect password',
      errorInput: !userLogin ? 'username' : 'password',
    });
  } else {
    linkAccountToMessenger(res, userLogin.username, redirectURI);
  }
});

module.exports = router;
