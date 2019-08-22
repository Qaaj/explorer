/**
 * Created by janjorissen on 21.08.18.
 */


let store;
let lastState;
let instances = [];

export const setStore = (_store) => {
  store = _store;
  const { dispatch } = store;
  store.subscribe(() => {
    const action = store.getState().lastAction;
    const state = store.getState();
    if (!lastState) lastState = state;
    instances.forEach((instance) => {
      instance.callback.call(instance.cyto, { cyto: instance.cyto, action, state, lastState, dispatch });
    });
    lastState = state;
  });
  return _store;
};

export const subscribe = (cyto, callback) => {
  instances.push({ cyto, callback });
  return store.dispatch;
};

export const unsubscribe = (cyto) => {
  instances = instances.filter((instance) => {
    if (instance.cyto === cyto) return false;
    return true;
  });
};
