import warning from 'warning';

import ClassifierHandler from './ClassifierHandler';

export default class ClassifierHandlerBuilder extends ClassifierHandler {
  constructor() {
    super();
    warning(
      false,
      '`ClassifierHandlerBuilder` is deprecated. use `ClassifierHandler` instead.'
    );
  }
}
