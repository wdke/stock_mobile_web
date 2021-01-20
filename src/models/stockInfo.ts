import { message, notification } from 'antd';
import { history } from '@@/core/history';

import * as stockApi from '@/services/StockInfoService';
import { successHandler } from '@/function/CommonFunction';

export default {
  namespace: 'stockInfo',
  state: {
    visible: false,
    model: false,
    types: 1,
    stockName: '',
    tradingNumber:1000,

    list: [],
    searchList: [],
    pageInfo: {},
    condition: {
      day: 3,
      nowPrice: 10,
      lessClose: 30,
      moreClose: 80,
      stockName: '',
      lastDate: 20200101,
      orderBy: 'diff desc',
    },
  },

  reducers: {
    save(state, { data }) {


      console.info('save data=', data);
      return { ...state, ...data };
    },

    getStockName(state, { data }) {

      return { ...state };
    },
  },
  effects: {

    //  加载普通事件新增配置
    * addInfo({ param }, { call, put }) {

      console.info('add query=', param);


      const data = yield call(stockApi.addInfo, { ...param });


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        //  跳转到指定路由
        history.push('/stock/info');
      }


    },


    * stockInfoList({ query }, { call, put }) {

      console.info('stockInfoList query=', query);
      yield put({ type: 'save', data: { condition: { ...query } } });


      const data = yield call(stockApi.stockInfoList, query);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { pageInfo: data.data } });
      }


    },


    * searchStockInfoList({ words }, { call, put }) {

      console.info('searchStockInfoList query=', words);


      const data = yield call(stockApi.searchStockInfoList, words);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { searchList: data.data } });
      }


    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.info('pathname=', pathname);
        if (pathname === '/') {

          dispatch({
            type: 'stockInfoList', query: {
              ...query,

            },
          });
        }
      });
    },
  },
};

