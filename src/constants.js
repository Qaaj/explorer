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
export const FETCH_HEIGHT = createConstants('FETCH_HEIGHT');
export const FETCH_TX = createConstants('FETCH_TX');
export const POLLING = createConstants('POLLING');

export const fetchBlock = createActions(FETCH_BLOCK);
export const fetchHeight = createActions(FETCH_HEIGHT);
export const fetchTx = createActions(FETCH_TX);
export const polling = createActions(POLLING);
console.log(polling);
