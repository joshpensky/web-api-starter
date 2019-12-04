/**
 * Helper for processing the given actions or mutations (items)
 * per module to create scoped actions or mutations (items) that
 * work within the given scope.
 *
 * @param {string} scopedName the name of the module to scope
 * actions to
 * @param {Record<string, function>} items the items to scope
 * @param {function} getScopedItem a function that accepts the
 * chosen item, scoped state, action, and global state to produce
 * the resulting state for calling the chosen items
 * @returns {Record<string, function>} the object of scoped items
 */
const getScopedItems = (scopedName, items, getScopedItem) => {
  const types = Object.keys(items);

  const scopedItems = types.reduce((acc, itemType) => {
    const chosenItem = items[itemType];
    const scopedItem = (globalState, action) => {
      const scopedState = globalState[scopedName];
      return getScopedItem(chosenItem, scopedState, action, globalState);
    };

    return {
      ...acc,
      [itemType]: scopedItem,
    };
  }, {});

  return scopedItems;
};

export default getScopedItems;
