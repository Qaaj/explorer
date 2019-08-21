import { combineEpics, ofType } from 'redux-observable';
import { take, tap, takeUntil, mergeMap, map, retry, retryWhen, catchError, delay } from 'rxjs/operators';
import { interval, from, of, defer } from 'rxjs';
import _ from 'lodash';
import {
  FETCH_BLOCK,
  POLLING,
  fetchBlock,
  fetchHeight,
  FETCH_HEIGHT,
} from '../constants';


// Promise to get a block

const getBlock = (id, web3) => {
  return new Promise((ok, nok) => {
    web3.eth.getBlock(id, (a, b) => {
      if (b) return ok(b);
      console.log('Error: ', a,b, ' - will retry.')
      nok({ error: `Request for block #${id} failed: ${a.toString()}  - ${JSON.stringify(a)}`, number: id });
    });
  });
}

// Defer the promise to re-use it

const getBlockObservable = (id, web3) => {
  return defer(() => from(getBlock(id, web3)));
}

const fetchBlockEpic = (action$, store) => action$.pipe(
    ofType(FETCH_BLOCK.START),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          return getBlockObservable(action.payload, web3).pipe(
              map((data) => fetchBlock.success(data)),
              retry(2),
              catchError((err) => of(fetchBlock.failure(err))),
          )
        }
    ),
);

// Get the last block (blockHeight). Also load any blocks we missed inbetween

const getLastBlock = (action$, store) => action$.pipe(
    ofType(FETCH_HEIGHT.START),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          return new Promise((ok, nok) => {
            web3.eth.getBlockNumber((a, b) => ok(b));
          })
        }
    ),
    map((lastBlock) => {
      const { blockHeight } = store.value.blocks;
      let missingBlocks = []
      if (blockHeight) {
        console.log('Missing Blocks: ', _.range(blockHeight, lastBlock));
        missingBlocks = _.range(blockHeight, lastBlock);
      }
      return { lastBlock, missingBlocks };
    }),
    mergeMap(({ lastBlock, missingBlocks }) => from([
      fetchHeight.success(lastBlock),
      fetchBlock.start(lastBlock),
      ...missingBlocks.map((block) => {
        console.log('Fetching missing block: ', block)
        return fetchBlock.start(block)
      })
    ])),
)

// TODO: Fetche the transactions of a block

const fetchTxEpic = (action$, store) => action$.pipe(
    ofType(FETCH_TX.START),
)

// Start polling - define which actions you want to be polled

const pollEpic = (action$) => action$.pipe(
    ofType(POLLING.START),
    mergeMap(action =>
        interval(5 * 1000).pipe(
            takeUntil(action$.ofType(POLLING.FAILURE))
        )
    ),
    mergeMap((data) => from([ // Define all actions you want to be done by polling here
      fetchHeight.start(data),
    ]))
)

export const rootEpic = combineEpics(pollEpic, getLastBlock, fetchBlockEpic);
