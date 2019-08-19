const createConstants = (str) => {
  return {
    START: `${str}_START`,
    SUCCESS: `${str}_SUCCESS`,
    FAILURE: `${str}_FAILURE`,
  }
};

const createActions = (str) => {
  return {
    start: (payload) => ({ type: str.START, payload }),
    success: (data) => ({ type: str.SUCCESS, payload: data }),
    failure: (err) => ({ type: str.FAILURE, error: err }),
  }
}

export const FETCH_BLOCK = createConstants('FETCH_BLOCKS');
export const fetchBlock = createActions(FETCH_BLOCK);
