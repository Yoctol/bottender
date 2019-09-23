/* eslint-disable max-classes-per-file */
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

// eslint-disable-next-line import/no-unresolved
const CompLibrary = require('../../core/CompLibrary.js');

const { Component } = React;

const { Container, GridBlock, MarkdownBlock } = CompLibrary;

const Block = props => (
  <Container padding={['top']} id={props.id} background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

class HomeSplash extends Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">{props.children}</div>
        <div className="triangle" />
      </div>
    );

    return (
      <SplashContainer>
        <div className="hero-content">
          <h1>
            Make Bots Your Way, <br /> Fast and Flexible.
          </h1>
          <h2>Make Bots Your Way, Fast and Flexible.</h2>
          <a className="primary large" href={docUrl('doc1')}>
            Get Started Now
          </a>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;

    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <div className="features">
            <h2>Why Bottender?</h2>
            <Block layout="twoColumn">
              {[
                {
                  content:
                    'Build encapsulated handlers that manage your business logic, then compose them to make complex Bots. Handlers are just JavaScript  functions which can achieve whatever you want.',
                  image: `${baseUrl}img/element_flexible.svg`,
                  imageAlign: 'left',
                  title: 'Flexible',
                },
                {
                  content:
                    'Bottender is written with ES6/ES7 up syntax and it fully supports async  await  function. We can deal with complex async logic without losing  the  readability and maintainability of code.',
                  image: `${baseUrl}img/element_morden.svg`,
                  imageAlign: 'left',
                  title: 'Modern',
                },
              ]}
            </Block>

            <Block layout="twoColumn">
              {[
                {
                  content:
                    'There is a set of interface that defines the core modules provided by Bottender. You can use your own implementation of session store, your HTTP server framework or even connect your bot to any platform.',
                  image: `${baseUrl}img/element_modular.svg`,
                  imageAlign: 'left',
                  title: 'Modular',
                },
                {
                  content:
                    'Handle multiple platforms with consistent development experience. You can  develop bots for different platforms including Messenger, LINE, Slack  and Telegram comfortably, with a similar mindset.',
                  image: `${baseUrl}img/element_anywhere.svg`,
                  imageAlign: 'left',
                  title: 'Learn Once, Write Anywhere',
                },
              ]}
            </Block>
          </div>

          <div className="triangle" />

          <div className="demo">
            <h2>Developers First</h2>
            <div className="demo-content">
              <div className="code-block">
                <MarkdownBlock>
                  {`
~~~bash
❯ create-bottender-app
? What's your project name? awesome-bot
? What platform of bot do you want to create? messenger
? Where do you want to store session? (Use arrow keys)
❯ memory
  file
  redis
  mongo
~~~
              `}
                </MarkdownBlock>
              </div>
              <div className="description">
                <h3>Initialize</h3>
                <p>
                  After installed, we can start to create a new bot with
                  bottender init command
                </p>
              </div>
            </div>
          </div>

          <div className="get-started">
            <div className="get-started-card">
              <div className="get-started-card-background">
                <div className="primary-box" />
                <div className="secondary-box" />
              </div>
              <img
                src={`${baseUrl}img/element_build_your_bot_logo.svg`}
                alt="bottender logo"
              />
              <div className="get-started-content">
                <h2>Build Your Bot Today!</h2>
                <a className="primary large" href={docUrl('doc1')}>
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
