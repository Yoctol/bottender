/* @flow */
import hasha from 'hasha';
import pascalCase from 'pascal-case';
import invariant from 'invariant';

import type Context from '../session/Context';

import HandlerBuilder from './HandlerBuilder';
import type { Handler, Msg } from './HandlerBuilder';

type Action = Array<any>;

class Node {
  _key: string;
  _name: string;
  _actions: Array<Action>;

  constructor(name: string, actions) {
    this._key = `__${hasha(name, { algorithm: 'sha256' })}__`;
    this._name = name;
    this._actions = actions;
  }

  get key(): string {
    return this._key;
  }

  getActions(): Array<Action> {
    return this._actions;
  }
}

type NodeMap = {
  [key: string]: Node,
};

function handleNode(context: Context, node: Node) {
  const actions = node.getActions();
  actions.forEach(([type, ...args]) => {
    // auto link for buttons, quick_replies
    if (type === 'button_template') {
      args[1].forEach(button => {
        if (button.transition_to) {
          button.payload = button.transition_to().key;
          delete button.transition_to;
        }
      });
    }
    if (type === 'quick_replies') {
      args[2].forEach(button => {
        if (button.transition_to) {
          button.payload = button.transition_to().key;
          delete button.transition_to;
        }
      });
    }

    // $FlowExpectedError
    context[`send${pascalCase(type)}`](...args);
  });
}

export default class DangerousDCGHandlerBuilder {
  _getStartedNode: ?Node;
  _unhandledHandler: ?Handler;

  _nodeMap: NodeMap = {};

  onGetStarted(node: Node) {
    this._getStartedNode = node;
    return this;
  }

  onUnhandled(handler: Handler) {
    this._unhandledHandler = handler;
    return this;
  }

  createNode(name: string, actions: Array<Action>): Node {
    const node = new Node(name, actions);

    invariant(
      !this._nodeMap[node.key],
      'can not create node with duplicate name',
    );

    this._nodeMap[node.key] = node;
    return node;
  }

  build() {
    return (context: Context, msg: Msg) => {
      const { message, postback } = msg;

      let payload;

      if (postback) {
        if (
          this._getStartedNode &&
          postback.payload === HandlerBuilder.GET_STARTED_PAYLOAD
        ) {
          handleNode(context, this._getStartedNode);
          return;
        }
        payload = postback.payload;
      }

      if (message && message.quick_reply) {
        payload = message.quick_reply.payload;
      }

      if (payload) {
        // handler
        const targetNode = this._nodeMap[payload];
        if (targetNode) {
          handleNode(context, targetNode);
        }
      }

      if (this._unhandledHandler) {
        this._unhandledHandler(context, msg);
      }
    };
  }
}
