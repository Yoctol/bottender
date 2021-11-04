import Layout from '@theme/Layout';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Showcase from '../components/Showcase';

const Users = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout>
      <div className="mainContainer">
        <div className="showcaseSection">
          <div className="prose">
            <h1>
              <translate>Who is using Bottender?</translate>
            </h1>
          </div>
          <Showcase users={siteConfig.customFields.users} />
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
      </div>
    </Layout>
  );
};

export default Users;
