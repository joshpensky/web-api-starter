import { useMemo } from 'react';
import useStore from './useStore';

/**
 * React hook for mapping a module's state to variables within
 * a functional component. You can either create aliases for
 * state variables, or create computed values with functions.
 *
 * @example
 * ```js
 * const { minutes } = useMappedState('time', {
 *   minutes: MINUTES,
 * });
 * ```
 *
 * @example
 * ```js
 * const { seconds } = useMappedState('time', {
 *   seconds: state => state[MINUTES] * 60,
 * });
 * ```
 *
 * @param {string} moduleName the name of the module to access state
 * @param {Record<string, string|function>} map a map from variable
 * names to state variable names or state getter functions
 * @param {any[]} [deps=[]] the dependency array for the hook
 * @returns {Record<string, any>} an object of variable names which
 * contain their mapped state values
 */
const useMappedState = (moduleName, map, deps = []) => {
  const [state] = useStore(moduleName);

  const mappedState = useMemo(
    () =>
      Object.entries(map).reduce((acc, [key, value]) => {
        let mappedValue;
        if (typeof value === 'string') {
          mappedValue = state[value];
        } else if (typeof value === 'function') {
          mappedValue = value(state);
        } else {
          throw 'Maps must either be a string (for aliases) or a function (for computed value)';
        }
        return {
          ...acc,
          [key]: mappedValue,
        };
      }, {}),
    [map, state, ...deps],
  );

  return mappedState;
};

export default useMappedState;
