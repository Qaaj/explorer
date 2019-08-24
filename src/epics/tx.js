import { ofType } from "redux-observable";
import {
 FETCH_TX, fetchTx
} from '../constants';
import { filter, mergeMap ,tap } from "rxjs/operators";
import { defer, from, of } from 'rxjs';


const getTx = (id, web3) => {
 return new Promise((ok, nok) => {
  web3.eth.getTransaction(id, (a, b) => {
   if (b) return ok(b);
   console.log('Error: ', a, b, ' - will retry.')
   nok({ error: `Request for transaction #${id} failed`, number: id });
  });
 });
}

export const fetchTxEpic = (action$, store) => action$.pipe(
    ofType(FETCH_TX.START),
    tap(console.log),
    mergeMap(async action =>  {
     const { web3 } = store.value.settings;
     const promises = Promise.all(action.payload.map((tx) => getTx(tx, web3)));
     const result = await promises;
     return fetchTx.success(result);
    }),
    tap(console.log),
    filter(action => action.type !== 'NONE'),
)
