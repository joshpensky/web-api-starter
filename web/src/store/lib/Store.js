import getScopedItems from './getScopedItems';

class Store {
  /**
   * @constructor
   * Creates a new store from the given modules.
   *
   * @param {object[]} [modules=[]] the array of modules to build the
   * store from
   */
  constructor(modules = []) {
    this._modules = modules;

    this._state = {};
    this._mutationCases = {};
    this._actionCases = {};

    this._listeners = {};

    this._initStore();
  }

  /**
   * @private
   * Process the given actions per module to create scoped actions
   * that work within the given scope.
   *
   * @param {string} scopedName the name of the module to scope
   * actions to
   * @param {Record<string, function>} mutations the actions to scope
   * @returns {Record<string, function>} the object of scoped actions
   */
  _getScopedActions = (scopedName, actions) => {
    const scopedItem = async (chosenAction, scopedState, action, globalState) => {
      const dispatchedAction = await new Promise((resolve, reject) => {
        /**
         * Runs the chosen action, passing in the current state context
         * (including scoped state, global state, and a commit callback)
         * and the action payload.
         */
        (async () => {
          const commit = (type, payload) => resolve({ type, payload });
          const context = { commit, state: scopedState, globalState };
          try {
            await chosenAction(context, action.payload);
          } catch (err) {
            reject(err);
          }
        })();
      });
      return dispatchedAction;
    };
    return getScopedItems(scopedName, actions, scopedItem);
  };

  /**
   * @private
   * Process the given mutations per module to create scoped mutations
   * that work within the given scope.
   *
   * @param {string} scopedName the name of the module to scope
   * mutations to
   * @param {Record<string, function>} mutations the mutations to scope
   * @returns {Record<string, function>} the object of scoped mutations
   */
  _getScopedMutations = (scopedName, mutations) => {
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
   * @private
   * Initializes the store, by setting the initial state and creating
   * the scoped mutation and action cases.
   */
  _initStore = () => {
    this._modules.forEach(({ actions, mutations, name, state }) => {
      this._state[name] = state;

      this._mutationCases = {
        ...this._mutationCases,
        ...this._getScopedMutations(name, mutations),
      };

      this._actionCases = {
        ...this._actionCases,
        ...this._getScopedActions(name, actions),
      };
    });
  };

  /**
   * @private
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
  _reduceMutations = (state, action) => {
    const matchCase = this._mutationCases[action.type];
    if (matchCase) {
      return matchCase(state, action);
    }
    return state;
  };

  /**
   * Gets the current state of the store.
   *
   * @returns {object} an immutable copy of the store state
   */
  getState = scopedName => {
    let state = this._state;
    if (scopedName in state) {
      state = state[scopedName];
    }
    return Object.freeze(state);
  };

  /**
   * @private
   * Gets a unique listener ID for a new listener.
   *
   * @returns {string} the listener's unique listener ID
   */
  _getUniqueListenerId = () => {
    let listenerId;

    do {
      listenerId = Math.random()
        .toString(36)
        .substr(2, 9);
    } while (this._listeners[listenerId]);

    return listenerId;
  };

  /**
   * Subscribes a new listener to all state changes (mutations) that
   * occur from dispatches.
   *
   * @param {function} listener a function listener, that accepts a
   * single argument of the new state
   * @returns {function} an unsubscribe function to stop the listener
   * from receiving new states
   */
  subscribe = listener => {
    const id = this._getUniqueListenerId();
    this._listeners[id] = listener;
    listener(this.getState());

    return () => {
      delete this._listeners[id];
    };
  };

  /**
   * Dispatch function that handles both mutation cases (handled by
   * the default reducer dispatch) and async action cases.
   *
   * @param {object} action an action dispatched to the store
   * @param {string} action.type the type of action that was dispatched.
   * Used to narrow which reducer to use
   * @param {any} action.payload additional information about the action
   * to provide more context to the reducer
   */
  dispatch = async action => {
    let dispatchedAction = action;
    const matchAction = this._actionCases[action.type];
    if (matchAction) {
      dispatchedAction = await matchAction(this._state, action);
    }
    this._state = this._reduceMutations(this._state, dispatchedAction);
    const newState = this.getState();
    Object.values(this._listeners).forEach(listener => {
      listener(newState);
    });
  };
}

export default Store;
