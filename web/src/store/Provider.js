import React from 'react';
import PropTypes from 'prop-types';
import storeContext from './storeContext';
import useAsyncReducer from './hooks/useAsyncReducer';

const Provider = ({ children, store }) => {
  const [reducer, initialState] = store;
  const [state, dispatch] = useAsyncReducer(reducer, initialState);

  const value = [state, dispatch];
  return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.array.isRequired,
};

export default Provider;
