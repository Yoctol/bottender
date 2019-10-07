import invariant from 'invariant';

export function not(predicate) {
  return context => !predicate(context);
}

export function and(predicates) {
  invariant(
    Array.isArray(predicates),
    `and: predicates must be an array. Recevied ${predicates}`
  );
  return context => predicates.every(predicate => predicate(context));
}

export function or(predicates) {
  invariant(
    Array.isArray(predicates),
    `or: predicates must be an array. Recevied ${predicates}`
  );
  return context => predicates.some(predicate => predicate(context));
}

export function alwaysTrue() {
  return () => true;
}

export function alwaysFalse() {
  return () => false;
}
