import Context from './context/Context';

export type Action = (
  context: Context,
  props?: Props
) => void | Action | Promise<Action>;

export type Props = {
  next?: Action;
  [key: string]: any;
};
