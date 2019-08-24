import { FETCH_BLOCK, FETCH_HEIGHT, FETCH_TX, SET_SELECTION } from '../constants';

const initialState = {
  blocks: {},
  transactions: {},
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEIGHT.SUCCESS: {
      if (state.blockHeight === action.payload) return state;
      return { ...state, blockHeight: action.payload }
    }
    case FETCH_BLOCK.START:
      if (state.blocks[action.payload] && !state.blocks[action.payload].error) return state;
      return {
        ...state,
        blocks: { ...state.blocks, [action.payload]: { isLoading: true } },
      };
    case FETCH_BLOCK.SUCCESS:
      return {
        ...state,
        blocks: { ...state.blocks, [action.payload.number]: action.payload },
      };
    case FETCH_BLOCK.FAILURE:
      return {
        ...state,
        blocks: { ...state.blocks, [action.payload.number]: { isLoading: false, error: action.payload.error } },
      };
      case SET_SELECTION.START:
      return {
        ...state,
        selection: action.payload,
      };
    case FETCH_TX.SUCCESS:
      const txs = action.payload;
      const transactions = state.transactions;
      txs.forEach((tx) => {
        transactions[tx.hash] = tx;
      })
      return { ...state, transactions };

    default:
      return state;
  }
}
