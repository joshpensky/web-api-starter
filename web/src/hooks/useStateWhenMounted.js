import { useEffect, useRef, useState } from 'react';

/**
 * React hook for only updating a component's state when the component is still mounted.
 * This is useful for state variables that depend on asynchronous operations to update.
 *
 * The interface in which this hook is used is identical to that of `useState`.
 *
 * @param {any} initialState the initial value of the state variable
 * @returns {[any, function]} an array containing the state variable and the function to
 * update the state
 */
const useStateWhenMounted = initialState => {
  const isMounted = useRef(true);

  const [state, setState] = useState(initialState);

  const setStateWhenMounted = newState => {
    if (isMounted.current) {
      setState(newState);
    }
  };

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return [state, setStateWhenMounted];
};

export default useStateWhenMounted;
