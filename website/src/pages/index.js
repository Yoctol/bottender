// eslint-disable-next-line import/no-unresolved
import Highlight, { defaultProps } from 'prism-react-renderer';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import React from 'react';
import theme from 'prism-react-renderer/themes/vsDark'; // FIXME: which theme?
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

const HomeSplash = () => {
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

const Index = () => {
  const { siteConfig } = useDocusaurusContext();
  console.log(siteConfig);

  // return <Layout>XD</Layout>;

  const { baseUrl } = siteConfig;

  return (
    <Layout>
      <HomeSplash siteConfig={siteConfig} language="en" />
      <div className="mainContainer indexContainer">
        <div className="features">
          <h2>Why Bottender?</h2>
          <div className="container">
            <div className="row">
              <div className="col">col</div>
              <div className="col">col</div>
            </div>
          </div>
          {/* <Block layout="twoColumn">
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
          </Block> */}

          {/* <Block layout="twoColumn">
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
          </Block> */}
        </div>

        <div className="triangle" />

        <div className="demo">
          <div className="demo-content">
            <div className="code-block">
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
              src={`${baseUrl}img/element_build_your_bot_logo.svg`}
              alt="bottender logo"
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
