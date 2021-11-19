import Highlight, { defaultProps } from 'prism-react-renderer';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import React, { FC } from 'react';
import theme from 'prism-react-renderer/themes/vsDark'; // FIXME: which theme?

const sampleCode = `
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
};`.trim();

const HomeSplash: FC = () => {
  return (
    <div className="homeContainer">
      <div className="homeSplashFade">
        <div className="hero-content">
          <h1>Bottender</h1>
          <h2>
            A framework for building <br />
            conversational user interfaces.
          </h2>
          <Link className="primary large" to="docs/">
            Get Started
          </Link>
        </div>
      </div>
      <div className="triangle" />
    </div>
  );
};

const Index: FC = () => {
  return (
    <Layout>
      <HomeSplash />
      <div className="mainContainer indexContainer">
        <div className="features">
          <h2>Why Bottender?</h2>
          <div className="container">
            <div className="wrapper gridBlock">
              <div className="blockElement">
                <div className="blockImage">
                  <img src="img/element_flexible.svg" alt="Declarative" />
                </div>
                <div className="blockContent">
                  <h2>Declarative</h2>
                  <div>
                    <span>
                      <p>
                        Bottender takes care of the complexity of conversational
                        UIs for you. Design actions for each event and state in
                        your application, and Bottender will run accordingly.
                      </p>
                      <p>
                        This approach makes your code more predictable and
                        easier to debug.
                      </p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="blockElement">
                <div className="blockImage">
                  <img
                    src="img/element_morden.svg"
                    alt="Native User Experience"
                  />
                </div>
                <div className="blockContent">
                  <h2>Native User Experience</h2>
                  <div>
                    <span>
                      <p>
                        Bottender lets you create apps on every channel and
                        never compromise on your users’ experience.
                      </p>
                      <p>
                        You can apply progressive enhancement or graceful
                        degradation strategy on your building blocks.
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="wrapper gridBlock">
              <div className="blockElement">
                <div className="blockImage">
                  <img src="img/element_modular.svg" alt="Easy Setup" />
                </div>
                <div className="blockContent">
                  <h2>Easy Setup</h2>
                  <p>
                    With Bottender, you only need a few configurations to make
                    your bot work with channels, automatic server listening,
                    webhook setup, signature verification and so much more.
                  </p>
                </div>
              </div>
              <div className="blockElement">
                <div className="blockImage">
                  <img
                    src="img/element_anywhere.svg"
                    alt="Ready for Production"
                  />
                </div>
                <div className="blockContent">
                  <h2>Ready for Production</h2>
                  <p>There are thousands of bots powered by Bottender.</p>
                  <p>
                    It has been optimized for real world use cases, automatic
                    batching request and dozens of other compelling features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="triangle" />

        <div className="demo">
          <div className="demo-content">
            <div className="code-block">
              {/* eslint-disable react/jsx-props-no-spreading,react/no-array-index-key */}
              <Highlight
                {...defaultProps}
                code={sampleCode}
                theme={theme}
                language="javascript"
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={className}
                    style={{ ...style, padding: '20px' }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              {/* eslint-enable react/jsx-props-no-spreading */}
            </div>
            <div className="description">
              <h3>Intuitive APIs</h3>
              <p>
                Bottender has some functional and declarative approaches can
                help you define your conversations.
              </p>
              <p>
                For most applications, you will begin by defining routes that
                you may familiar with when developing a web application.
              </p>
              <p>
                Besides router, you can describe the side effects with function
                actions. It’s the most important building part in the Bottender
                applications.
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
              src="img/element_build_your_bot_logo.svg"
              alt="Bottender Logo"
            />
            <div className="get-started-content">
              <h2>Build Your Bot Today!</h2>
              <Link className="primary large" to="docs/">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
