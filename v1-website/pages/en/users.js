/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

/* eslint-disable import/no-unresolved */
const CompLibrary = require('../../core/CompLibrary');
// eslint-disable-next-line import/no-dynamic-require
const Showcase = require(`${process.cwd()}/core/Showcase`);
const { translate } = require('../../server/translate');
/* eslint-enable import/no-unresolved */

const { Container } = CompLibrary;

class Users extends React.Component {
  render() {
    const { config: siteConfig } = this.props;

    return (
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>
                <translate>Who is using Bottender?</translate>
              </h1>
            </div>
            <Showcase users={siteConfig.users} />
            <div className="prose">
              <p>
                <translate>Is your project using Bottender?</translate>
              </p>
              <p>
                Edit this page with a{' '}
                <a href="https://github.com/Yoctol/bottender/edit/master/website/data/users.js">
                  Pull Request
                </a>{' '}
                to add your logo.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Users.title = 'Users';

module.exports = Users;
