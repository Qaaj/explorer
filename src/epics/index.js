import { combineEpics, ofType } from 'redux-observable';
import { take, takeUntil, mergeMap, map } from 'rxjs/operators';
import { interval, from, of  } from 'rxjs';
// import { ajax } from 'rxjs/ajax'
import {
  FETCH_BLOCK,
  POLLING,
  fetchBlock,
  fetchHeight,
  polling,
} from '../constants';

const fetchBlockEpic = (action$, store) => action$.pipe(
    ofType(FETCH_BLOCK.START),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          return new Promise((ok, nok) => {
            web3.eth.getBlock(action.payload, (a, b) => ok(b));
          })
        }
    ),
    map((data) => fetchBlock.success(data)),
);

const getLastBlock = (action$, store) => action$.pipe(
    ofType(POLLING.SUCCESS),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          return new Promise((ok, nok) => {
            web3.eth.getBlockNumber((a, b) => ok(b));
          })
        }
    ),
   mergeMap((data) => from([
       fetchHeight.success(data),
       fetchBlock.start(data)
   ])),
)

const fetchTxEpic = (action$, store) => action$.pipe(
    ofType(FETCH_TX.START),
)
//
const pollEpic = (action$) => action$.pipe(
    ofType(POLLING.START),
    mergeMap(action =>
        interval(5 * 1000).pipe(
            takeUntil(action$.ofType(POLLING.FAILURE))
        )
    ),
    map(() => polling.success())
)

export const rootEpic = combineEpics(fetchBlockEpic, pollEpic, getLastBlock);
