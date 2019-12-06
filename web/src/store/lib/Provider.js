import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useStateWhenMounted } from 'hooks';
import storeContext from './storeContext';

const Provider = ({ children, store }) => {
  const [toggleTick, setToggleTick] = useStateWhenMounted(false);

  /**
   * Dispatch function wrapper that updates the toggle ticker in order
   * to enact a state change and update the provider value.
   *
   * @param {object} action an action dispatched to the store
   * @param {string} action.type the type of action that was dispatched.
   * Used to narrow which reducer to use
   * @param {any} action.payload additional information about the action
   * to provide more context to the reducer
   */
  const dispatch = async action => {
    await store.dispatch(action);
    setToggleTick(toggleTick => !toggleTick);
  };

  const value = useMemo(() => [store.getState(), dispatch], [toggleTick]);
  return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object.isRequired,
};

export default Provider;
