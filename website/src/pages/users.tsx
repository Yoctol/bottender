import Layout from '@theme/Layout';
import React, { FC } from 'react';
import Translate from '@docusaurus/Translate';

import Showcase from '../components/Showcase';
import users from '../../data/users';

const Users: FC = () => {
  return (
    <Layout>
      <div className="mainContainer">
        <div className="showcaseSection">
          <div className="prose">
            <h1>
              <Translate>Who is using Bottender?</Translate>
            </h1>
          </div>
          <Showcase users={users} />
          <div className="prose">
            <p>
              <Translate>Is your project using Bottender?</Translate>
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
      </div>
    </Layout>
  );
};

export default Users;
