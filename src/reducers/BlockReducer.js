import { FETCH_BLOCK } from '../constants';

const initialState = {
  blocks: {}, 
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCK.START:
      return {
        ...state,
        blocks: { ...state.blocks, [action.payload]: { isLoading: true } },
      };
    case FETCH_BLOCK.SUCCESS:
      return {
        blocks: { ...state.blocks, [action.payload.number]: action.payload },
      };
    case FETCH_BLOCK.FAILURE:
      return {
        blocks: { ...state.blocks, [action.payload]: { isLoading: false, error: action.payload } },
      };
    default:
      return state;
  }
}
