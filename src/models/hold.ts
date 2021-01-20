import { message, notification } from 'antd';
import { history } from '@@/core/history';

import * as api from '@/services/HoldService';
import { successHandler } from '@/function/CommonFunction';
import * as stockApi from '@/services/stockService';

export default {
  namespace: 'hold',
  state: {
    visible: false,
    loading: false,

    list: [],
    eChartData: {
      stockCode: 'test',
      stockName: 'test',
      title:'test',
      key:[],
      value:[],
    },
  },

  reducers: {
    save(state, { data }) {


      console.info('stockCurrentHoldPrice save data=', data);
      return { ...state, ...data };
    },


    eChartDataEmpty(state, { data }) {


      console.info('stockCurrentHoldPrice save data=', data);
      return { ...state, eChartData: {} };
    },
  },
  effects: {

    //  加载普通事件新增配置
    * focus({ param }, { call, put }) {

      console.info('focus query=', param);


      const data = yield call(api.focus, { ...param });


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

      }


    },


    * list({ query }, { call, put }) {

      console.info('list query=', query);


      const data = yield call(api.list);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { list: data.data } });
      }
    },


    //  加载普通事件新增配置

    * stockInfoList({ query }, { call, put }) {

      console.info('stockInfoList query=', query);


      const data = yield call(stockApi.stockInfoList);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { stockInfoList: data.data } });
      }


    },


    //  加载普通事件新增配置

    * detailById({ id }, { call, put }) {

      console.info('stockCurrentHoldPrice detailById id=', id);

      yield put({ type: 'eChartDataEmpty',id});

      const data = yield call(api.detailById, id);

      console.info('stockCurrentHoldPrice detailById data=', data);

      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { ...data.data } });
      }


    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.info('pathname=', pathname);
        if (pathname === '/hold') {
          dispatch({ type: 'list', query });
        }
      });
    },
  },
};

