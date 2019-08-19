import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { rootEpic } from '../../src/epics';

const epicMiddleware = createEpicMiddleware();

// creates the store
export default (rootReducer) => {
  const enhancers = compose(
      window.devToolsExtension ?
          window.devToolsExtension() :
          function (store) {
            return store;
          }
  );
  const middleware = applyMiddleware(...[thunk,epicMiddleware]);
  const store = createStore(
      rootReducer,
      {},
      compose(middleware, enhancers)
  );
  epicMiddleware.run(rootEpic);
  return store
}
