import { message, notification } from 'antd';
import { history } from '@@/core/history';

import * as tradingApi from '@/services/TradingService';
import { successHandler } from '@/function/CommonFunction';

export default {
  namespace: 'trading',
  state: {
    visible: false,
    model:false,

    list: [],
  },

  reducers: {
    save(state, { data }) {


      console.info('save data=', data);
      return { ...state, ...data };
    },
  },
  effects: {

    //  新增
    * add({ param }, { call, put }) {

      console.info('add query=', param);


      const data = yield call(tradingApi.add, { ...param });


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        // history.push('/trading');
      }


    },

    //  删除
    * remove({ id }, { call, put }) {

      console.info('remove id=', id);


      const data = yield call(tradingApi.remove, id);


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        history.push('/trading');
      }


    },

    //  删除
    * undo({ id }, { call, put }) {

      console.info('undo id=', id);


      const data = yield call(tradingApi.undo, id);


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        history.push('/trading');
      }


    },

    //  删除
    * complete({ id }, { call, put }) {

      console.info('complete id=', id);


      const data = yield call(tradingApi.complete, id);


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        history.push('/trading');
      }


    },


    //  结束
    * toEnd({ param }, { call, put }) {

      console.info('toEnd param=', param);


      const data = yield call(tradingApi.toEnd, {...param});


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        history.push('/trading');
      }


    },
    // 所有数据列表
    * list({ query }, { call, put }) {

      console.info('list query=', query);


      const data = yield call(tradingApi.list);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { list: data.data } });
      }


    },

    // 所有数据列表
    * holdlist({ query }, { call, put }) {

      console.info('holdlist query=', query);


      const data = yield call(tradingApi.holdList);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { list: data.data } });
      }


    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.info('pathname=', pathname);
        if (pathname === '/trading') {
          dispatch({ type: 'holdlist', query});
        }
      });
    },
  },
};

