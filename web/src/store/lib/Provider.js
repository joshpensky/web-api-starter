import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useStateWhenMounted } from 'hooks';
import storeContext from './storeContext';

const Provider = ({ children, store }) => {
  const [state, setState] = useStateWhenMounted(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(() => [state, store.dispatch], [state]);
  return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object.isRequired,
};

export default Provider;
