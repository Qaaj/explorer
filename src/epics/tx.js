import { ofType } from "redux-observable";
import {
 FETCH_TX
} from '../constants';

export const fetchTxEpic = (action$, store) => action$.pipe(
    ofType(FETCH_TX.START),
)
