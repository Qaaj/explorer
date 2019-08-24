import { combineEpics, ofType } from 'redux-observable';
import {
  take,
  tap,
  takeUntil,
  mergeMap,
  map,
  retry,
  retryWhen,
  catchError,
  delay,
  every,
  filter
} from 'rxjs/operators';
import { interval, from, of, defer, pipeIf } from 'rxjs';
import _ from 'lodash';
import {
  FETCH_BLOCK,
  fetchBlock,
  fetchHeight,
  FETCH_HEIGHT,
  ADD_SELECTION, fetchTx,
} from '../constants';


// Promise to get a block

const getBlock = (id, web3) => {
  return new Promise((ok, nok) => {
    web3.eth.getBlock(id, (a, b) => {
      if (b) return ok(b);
      console.log('Error: ', a, b, ' - will retry.')
      nok({ error: `Request for block #${id} failed`, number: id });
    });
  });
}

// Defer the promise to re-use it

const getBlockObservable = (id, web3) => {
  return defer(() => from(getBlock(id, web3)));
}

export const fetchBlockEpic = (action$, store) => action$.pipe(
    ofType(FETCH_BLOCK.START),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          if (
              store.value.blocks.blocks[action.payload] &&
              !store.value.blocks.blocks[action.payload].error &&
              !store.value.blocks.blocks[action.payload].isLoading
          ) return of({ type: 'NONE' });
          return getBlockObservable(action.payload,
              web3).pipe(
              map((data) => fetchBlock.success(data)),
              retry(2),
              catchError((err) => of(fetchBlock.failure(err))),
          )
        }
    ),
    filter(action => action.type !== 'NONE')
);

export const addBlockToSelection = (action$, store) => action$.pipe(
    ofType(ADD_SELECTION.START),
    filter(action => action.payload.type === 'block'),
    mergeMap(action => {
        const block = store.value.blocks.blocks[action.payload.id];
        console.log(block);
        if(block && block.transactions){
          return of(fetchTx.start(block.transactions));
        }
        return of({ type: 'NONE' });
        }
    ),
    filter(action => action.type !== 'NONE')
);


// Get the last block (blockHeight). Also load any blocks we missed in between

export const getLastBlock = (action$, store) => action$.pipe(
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
      missingBlocks = _.range((blockHeight || lastBlock - 5), lastBlock);
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
