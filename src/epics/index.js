import { combineEpics, ofType } from 'redux-observable';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { interval, from } from 'rxjs';

// Epics
import * as blockEpics from './blocks';
import * as txEpics from './tx';

import {
  fetchHeight,
  POLLING,
} from '../constants';

// Start polling - define which actions you want to be polled

const pollEpic = (action$) => action$.pipe(
    ofType(POLLING.START),
    mergeMap(action =>
        interval(5 * 1000).pipe(
            takeUntil(action$.ofType(POLLING.FAILURE))
        )
    ),
    mergeMap((data) => from([ // Define all actions you want to be done by polling here
      fetchHeight.start(),
    ]))
)

export const rootEpic = combineEpics(
    pollEpic,
    ...Object.values(blockEpics),
    ...Object.values(txEpics),
);

