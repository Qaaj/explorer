import { combineEpics, ofType, } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax'
import { FETCH_BLOCK, fetchBlock } from '../constants';

const fetchUserEpic = (action$, store) => action$.pipe(
    ofType(FETCH_BLOCK.START),
    mergeMap(action => {
          const { web3 } = store.value.settings;
          const test = new Promise((ok, nok)=> {
            web3.eth.getBlock(action.payload, (a,b) => ok({type: FETCH_BLOCK.SUCCESS, payload: b}));
          })
          return test;
          // return ajax.getJSON(`https://api.github.com/users/qaaaj`).pipe(
          //     map(response => fetchBlock.success(response))
          // )
        }
    )
);
export const rootEpic = combineEpics(fetchUserEpic);
