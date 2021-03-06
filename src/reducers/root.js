import { combineReducers } from 'redux'
import configureStore from './createStore'

export default (web3) => {

  const rootReducer = combineReducers({
    settings: require('./SettingsReducer').reducer(web3),
    blocks: require('./BlockReducer').default,
    lastAction: (state = null, action) => action,
  });

  return configureStore(rootReducer)
}
