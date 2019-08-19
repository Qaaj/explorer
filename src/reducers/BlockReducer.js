import { FETCH_BLOCK } from '../constants';

const initialState = {
  blocks: {}, // for this example we'll make an app that fetches and lists whiskies
  isLoading: false,
  error: false,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCK.START:
      return {
        ...state,
        // whenever we want to fetch the whiskies, set isLoading to true to show a spinner
        isLoading: true,
        error: null
      };
    case FETCH_BLOCK.SUCCESS:
      return {
        whiskies: [...action.payload],
        // whenever the fetching finishes, we stop showing the spinner and then show the data
        isLoading: false,
        error: null
      };
    case FETCH_BLOCK.FAILURE:
      return {
        whiskies: [],
        isLoading: false,
        // same as FETCH_WHISKIES_SUCCESS, but instead of data we will show an error message
        error: action.payload
      };
    default:
      return state;
  }
}

