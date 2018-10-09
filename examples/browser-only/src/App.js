import React, { Component } from 'react';
import BotUI from '@chentsulin/react-botui';
import 'botui/build/botui.min.css';
import 'botui/build/botui-theme-default.css';

import BrowserBot from './BrowserBot';
import handler from './handler';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          human: true,
          content: 'hello',
        },
        {
          content: 'world',
        },
      ],
    };

    const bot = new BrowserBot({
      client: {
        sendText: text => {
          this.setState({
            messages: [
              ...this.state.messages,
              {
                content: text,
              },
            ],
          });
        },
      },
    });

    bot.onEvent(handler);

    this.bot = bot;
  }

  handleAction = res => {
    const text = res.value;

    this.setState({
      messages: [
        ...this.state.messages,
        {
          human: true,
          content: text,
        },
      ],
    });

    const requestHandler = this.bot.createRequestHandler();

    requestHandler({
      message: {
        text,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BotUI
            messages={this.state.messages}
            action={{
              type: 'text',
              action: {
                placeholder: 'Enter your text here',
              },
            }}
            onAction={this.handleAction}
          />
        </header>
      </div>
    );
  }
}

export default App;
