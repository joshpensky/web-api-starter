import { useEffect, useRef } from 'react';

/**
 * React hook for storing the previous value of a given
 * value. The initial previous value will always be the
 * initial passed value.
 * 
 * @param {any} value the value to track
 * @returns {any} the previous value
 */
const usePrevious = value => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
