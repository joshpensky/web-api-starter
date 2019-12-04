import { useMemo } from 'react';
import useStore from './useStore';

/**
 * React hook for mapping a module's actions or mutations to action
 * dispatcher functions. This is to be used as a shorthand for
 * dispatching action types and payloads, by creating functions that
 * accept their dispatch payloads.
 *
 * @example
 * ```js
 * const { addSeconds } = useMappedActions('time', {
 *   addSeconds: ADD_SECONDS,
 * });
 * addSeconds(20);
 * ```
 *
 * @param {string} moduleName the name of the module to access state
 * @param {Record<string, string|function>} map a map from variable
 * names to action/mutation types
 * @param {any[]} [deps=[]] the dependency array for the hook
 * @returns {Record<string, any>} an object of variable names which
 * contain their mapped action dispatch functions
 */
const useMappedActions = (moduleName, map, deps = []) => {
  const [, dispatch] = useStore(moduleName);

  const mappedActions = useMemo(
    () =>
      Object.entries(map).reduce((acc, [key, value]) => {
        const action = payload => dispatch({ type: value, payload });
        return {
          ...acc,
          [key]: action,
        };
      }, {}),
    [map, dispatch, ...deps],
  );

  return mappedActions;
};

export default useMappedActions;
