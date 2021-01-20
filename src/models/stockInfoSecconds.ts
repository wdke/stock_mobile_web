
import * as api from '@/services/StockInfoSeccondsService';
import { successHandler } from '@/function/CommonFunction';

export default {
  namespace: 'stockInfoSecconds',
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
    * comparingThreeDays({ query }, { call, put }) {

      console.info('comparingThreeDays query=', query);


      const data = yield call(api.comparingThreeDays, { ...query });


      const response = successHandler(data);

      if (response) {
        data.data.code = query.code;
        yield put({ type: 'save', data: { detail: data.data } });
      }


    },



    * comparingThreeDaysHole({ query }, { call, put }) {

      console.info('comparingThreeDaysHole query=', query);


      const data = yield call(api.comparingThreeDaysHole);


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
        if (pathname === '/hold/secconds') {
          //  put({ type: 'save', data: { host: query.host } });
          dispatch({ type: 'comparingThreeDaysHole', query });
        }
      });
    },
  },
};

