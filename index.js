import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './src/reducers/root';

import { GlobalStyle } from './src/styles';
import { setStore } from './src/utils/cytoscape';
import { polling, fetchHeight } from './src/constants';
import Web3 from './src/services/web3';
import App from './src/App';


// Prints out current build # in console;
Web3.get().then((web3) => {

  window._web3 = web3;
  const store = createStore(web3);
  window.store = setStore(store);

  store.dispatch(polling.start());
  store.dispatch(fetchHeight.start());

  ReactDOM.render(
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
      ,
      document.getElementById('app')
  );
});
