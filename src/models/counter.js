
export default {

  namespace: 'counter',

  state: 0,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    add(state) {
      return state + 1
    },
    reduce(state) {
      return state - 1
    }
  },

};
