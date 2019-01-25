
export default {

  namespace: 'example',

  state: {},     //状态

  subscriptions: {  // 监听，数据变化时dispatch相应操作
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {    // 处理异步操作
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {   // 处理同步操作
    save(state, action) {
      return { ...state, ...action.payload };
    },
    add(state){
      return state + 1
    },
    reduce(state){
      return state - 1
    }
  },

};
