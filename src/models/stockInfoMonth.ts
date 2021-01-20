import * as stockApi from '@/services/StockInfoService';
import { successHandler } from '@/function/CommonFunction';
import { history } from '@@/core/history';

export default {
  namespace: 'stockInfoMonth',
  state: {
    data: {
      data: [],
    },
    diffs: [],

    types: 1,
    tradingNumber: 1000,
    model: false,
  },

  reducers: {
    save(state, { data }) {


      console.info('save data=', data);
      return { ...state, ...data };
    },

    isEmpty(state, { data }) {

      if (undefined === state.data) {

        return true;
      }
      return false;
    },
  },
  effects: {


    * monthListEchart({ query }, { call, put }) {

      console.info('stockInfoList query=', query);


      const data = yield call(stockApi.monthListEchart, query);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { data: data.data, ...query } });

      }


    },

    * diffListEchart({ query }, { call, put }) {

      console.info('diffListEchart query=', query);


      const data = yield call(stockApi.diffListEchart, query);


      const response = successHandler(data);

      if (response) {
        yield put({ type: 'save', data: { diffs: data.data, ...query } });

      }


    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.info('pathname=', pathname);
        if (undefined !== query && undefined !== query.stockCode && undefined !== query.stockType && pathname === '/snalysis/detail') {


          // 跳转到指定路由
          dispatch({ type: 'monthListEchart', query });
          // 跳转到指定路由
          dispatch({ type: 'diffListEchart', query });

        }
      });
    },
  },
};

