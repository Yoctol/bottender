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
const CompLibrary = require('../../core/CompLibrary');

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
          <h1>Bottender</h1>
          <h2>
            A framework for building <br />
            conversational user interfaces.
          </h2>
          <a className="primary large" href={docUrl('getting-started')}>
            Get Started
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
        <div className="mainContainer indexContainer">
          <div className="features">
            <h2>Why Bottender?</h2>
            <Block layout="twoColumn">
              {[
                {
                  content:
                    'Bottender takes care of the complexity of conversational UIs for you. Design actions for each event and state in your application, and Bottender will run accordingly.\n\nThis approach makes your code more predictable and easier to debug.',
                  image: `${baseUrl}img/element_flexible.svg`,
                  imageAlign: 'left',
                  title: 'Declarative',
                },
                {
                  content:
                    'Bottender lets you create apps on every channel and never compromise on your users’ experience.\n\nYou can apply progressive enhancement or graceful degradation strategy on your building blocks.',
                  image: `${baseUrl}img/element_morden.svg`,
                  imageAlign: 'left',
                  title: 'Native User Experience',
                },
              ]}
            </Block>

            <Block layout="twoColumn">
              {[
                {
                  content:
                    'With Bottender, you only need a few configurations to make your bot work with channels, automatic server listening, webhook setup, signature verification and so much more.',
                  image: `${baseUrl}img/element_modular.svg`,
                  imageAlign: 'left',
                  title: 'Easy Setup',
                },
                {
                  content:
                    'There are thousands of bots powered by Bottender.\n\nIt has been optimized for real world use cases, automatic batching request and dozens of other compelling features.',
                  image: `${baseUrl}img/element_anywhere.svg`,
                  imageAlign: 'left',
                  title: 'Ready for Production',
                },
              ]}
            </Block>
          </div>

          <div className="triangle" />

          <div className="demo">
            <div className="demo-content">
              <div className="code-block">
                <MarkdownBlock>
                  {`
~~~javascript
const { router, text } = require('bottender/router');

async function SayHi(context) {
  await context.sendText('Hi!');
}

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

module.export = function App(context) {
  return router([
    text('hi', SayHi),
    text('*', Unknown),
  ]);
};
~~~
              `}
                </MarkdownBlock>
              </div>
              <div className="description">
                <h3>Intuitive APIs</h3>
                <p>
                  Bottender has some functional and declarative approaches can
                  help you define your conversations. <br />
                  <br />
                  For most applications, you will begin by defining routes that
                  you may familiar with when developing a web application.
                  <br />
                  <br />
                  Besides router, you can describe the side effects with
                  function actions. It’s the most important building part in the
                  Bottender applications.
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
                <a className="primary large" href={docUrl('getting-started')}>
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
