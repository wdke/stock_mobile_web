
import * as api from '@/services/StockInfoDayService';
import { successHandler } from '@/function/CommonFunction';

export default {
  namespace: 'stockInfoDay',
  state: {

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
    * buySellCont({ query }, { call, put }) {

      console.info('buySellCont query=', query);


      const data = yield call(api.buySellCont, { ...query });


      const response = successHandler(data);

      if (response) {
        data.data.code = query.code;
        yield put({ type: 'save', data: { detail: data.data } });
      }


    },



    * buySellContHole({ query }, { call, put }) {

      console.info('buySellContHole query=', query);


      const data = yield call(api.buySellContHole);


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
        if (pathname === '/HoldDayMap') {
          //  put({ type: 'save', data: { host: query.host } });
          dispatch({ type: 'buySellContHole', query });
        }
      });
    },
  },
};

