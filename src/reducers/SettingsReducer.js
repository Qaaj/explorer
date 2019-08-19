import { createReducer, createActions } from 'reduxsauce'
import Web3 from '../services/web3';

const { Types, Creators } = createActions({
  providerChanged: ['web3'],
  setAccounts: ['accounts'],
})

//web3.eth.getBlock(8381593, console.log)

export const INITIAL_STATE = {};

export const providerChanged = (state, { web3 }) => {
  window._web3 = web3;
  return { ...state, web3 };
}
export const setAccounts = (state, { accounts }) => {
  return { ...state, accounts };
}

export const loadAccounts = (web3) => (dispatch) => {
  web3.eth.getAccounts((error, accounts) => {
    if (!error) dispatch(Creators.setAccounts(accounts));
  });
}

export const changeProvider = (url) => (dispatch) => {
  Web3.get(url).then((web3) => {
    dispatch(Creators.providerChanged(web3));
    dispatch(Creators.setAccounts(['0x0']));
    dispatch(loadAccounts(web3));
  });
}

export const reducer = (web3) => createReducer({ ...INITIAL_STATE, web3 }, {
  [Types.PROVIDER_CHANGED]: providerChanged,
  [Types.SET_ACCOUNTS]: setAccounts,
})

export const DefaultTypes = Types;

export default Creators;
