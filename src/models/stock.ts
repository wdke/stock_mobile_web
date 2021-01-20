
import {message, notification} from 'antd';
import {history} from '@@/core/history';

import * as stockApi from '@/services/stockService';
import { successHandler } from '@/function/CommonFunction';

export default {
  namespace: 'stock',
  state: {

    codeList: [],
    data: [],
  },

  reducers: {
    save(state, { data }) {


      console.info('save data=', data);
      return { ...state, ...data };
    },
  },
  effects: {


    //  加载普通事件新增配置
    * echartData({ query }, { call, put }) {

      console.info('echartData query=', query);


      const data = yield call(stockApi.echartData, { ...query });


      const response = successHandler(data);

      if (response) {
        data.data.code = query.code;
        yield put({ type: 'save', data: { detail: data.data } });
      }


    },



    * todayHoldPriceVolume({ query }, { call, put }) {

      console.info('todayHoldPriceVolume query=', query);


      const data = yield call(stockApi.todayHoldPriceVolume);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { data: data.data } });

      }


    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.info('pathname=', pathname);
        if (pathname === '/hold/price') {
          //  put({ type: 'save', data: { host: query.host } });
          dispatch({ type: 'todayHoldPriceVolume', query });
        }
      });
    },
  },
};

