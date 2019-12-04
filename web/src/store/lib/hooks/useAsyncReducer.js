import { useCallback, useMemo, useReducer } from 'react';
import getScopedItems from '../getScopedItems';

/**
 * React hook for replacing the default `useReducer` to be able
 * to handle async dispatches.
 *
 * @param {function} reducer action reducer that processes state
 * and actions to get the next store state
 * @param {object} initialState the initial store state
 * @param {object[]} modules the modules within the store
 */
const useAsyncReducer = (reducer, initialState, modules) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Process the given actions per module to create scoped actions
   * that work within the given scope.
   *
   * @param {string} scopedName the name of the module to scope
   * actions to
   * @param {Record<string, function>} mutations the actions to scope
   * @returns {Record<string, function>} the object of scoped actions
   */
  const getScopedActions = useCallback(
    (scopedName, actions) => {
      const scopedItem = async (chosenAction, scopedState, action, globalState) => {
        const dispatchedAction = await new Promise((resolve, reject) => {
          /**
           * Runs the chosen action, passing in the current state context
           * (including scoped state, global state, and a commit callback)
           * and the action payload.
           */
          const runAction = async () => {
            const commit = (type, payload) => resolve({ type, payload });
            const context = { commit, state: scopedState, globalState };
            try {
              await chosenAction(context, action.payload);
            } catch (err) {
              reject(err);
            }
          };

          runAction();
        });
        dispatch(dispatchedAction);
      };
      return getScopedItems(scopedName, actions, scopedItem);
    },
    [dispatch],
  );

  const actionCases = useMemo(
    () =>
      modules.reduce(
        (acc, { name, actions }) => ({
          ...acc,
          ...getScopedActions(name, actions),
        }),
        {},
      ),
    [getScopedActions, modules],
  );

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
  const asyncDispatch = useCallback(
    action => {
      const matchAction = actionCases[action.type];
      if (matchAction) {
        return matchAction(state, action);
      }
      return dispatch(action);
    },
    [actionCases, dispatch, state],
  );

  return [state, asyncDispatch];
};

export default useAsyncReducer;
