import getScopedItems from './getScopedItems';

/**
 * Process the given mutations per module to create scoped mutations
 * that work within the given scope.
 *
 * @param {string} scopedName the name of the module to scope
 * mutations to
 * @param {Record<string, function>} mutations the mutations to scope
 * @returns {Record<string, function>} the object of scoped mutations
 */
const getScopedMutations = (scopedName, mutations) => {
  const scopedItem = (chosenMutation, scopedState, action, globalState) => {
    const scopedStateAfterAction = chosenMutation(scopedState, action.payload, globalState);
    return {
      ...globalState,
      [scopedName]: scopedStateAfterAction,
    };
  };
  return getScopedItems(scopedName, mutations, scopedItem);
};

/**
 * Creates a new store, with an initial state and reducer.
 * Builds the store from an array of store modules.
 *
 * @param {object[]} [modules=[]] the array of modules to build the
 * store from
 * @returns {[function, object]} the store reducer and initial state
 */
const createStore = (modules = []) => {
  const initialState = {};

  const mutationCases = modules.reduce((acc, { name, state, mutations }) => {
    initialState[name] = state;

    return {
      ...acc,
      ...getScopedMutations(name, mutations),
    };
  }, {});

  /**
   * The reducer for the entire store. Accepts actions from
   * a dispatcher and updates the store accordingly.
   *
   * @param {object} state the current state of the store
   * @param {object} action the action that was dispatched
   * @param {string} action.type the type of action that
   * was dispatched. Used to narrow which reducer to use
   * @param {any} action.payload additional information
   * about the action to provide more context to the reducer
   */
  const mutationReducer = (state, action) => {
    const matchCase = mutationCases[action.type];
    if (matchCase) {
      return matchCase(state, action);
    }
    return state;
  };

  return [mutationReducer, initialState];
};

export default createStore;
