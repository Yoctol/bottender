import Context from './context/Context';

export type Action = (
  context: Context,
  props?: Props
) => void | Action | Promise<Action | void>;

export type Props = {
  next?: Action;
  error?: Error;
  [key: string]: any;
};

export type Plugin = (context: Context) => void;
