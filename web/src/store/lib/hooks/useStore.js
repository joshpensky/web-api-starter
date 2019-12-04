import { useContext } from 'react';
import storeContext from '../storeContext';

/**
 * React hook for retrieving the global store state and
 * dispatch function. Can scope to a given module.
 *
 * @example
 * ```js
 * const [store, dispatch] = useContext('time');
 * ```
 *
 * @param {string} [moduleName] the name of the module
 * to scope to
 * @returns {[object, function]} the scoped store and
 * dispatch function
 */
const useStore = moduleName => {
  const [store, dispatch] = useContext(storeContext);

  let scopedStore = store;

  if (moduleName) {
    scopedStore = store[moduleName];

    if (process.env.NODE_ENV !== 'production' && !scopedStore) {
      console.warn('This module does not exist in the store');
    }
  }

  return [scopedStore, dispatch];
};

export default useStore;
