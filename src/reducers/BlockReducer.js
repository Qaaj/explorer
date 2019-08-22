import { FETCH_BLOCK, FETCH_HEIGHT } from '../constants';

const initialState = {
  blocks: {},
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEIGHT.SUCCESS: {
      if(state.blockHeight === action.payload) return state;
      return { ...state, blockHeight: action.payload }
    }
    case FETCH_BLOCK.START:
      if(state.blocks[action.payload] && !state.blocks[action.payload].error) return state;
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
    default:
      return state;
  }
}
