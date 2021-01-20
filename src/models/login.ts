import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin,register } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { successHandler } from '@/function/CommonFunction';
import * as tradingApi from '@/services/TradingService';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const res = successHandler(response);
      if (!res) {
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      history.replace(redirect || '/');

    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },

    //  新增
    * register({ param }, { call, put }) {

      console.info('register query=', param);


      const data = yield call(register, { ...param });


      const response = successHandler(data);

      if (response) {
        message.success(data.msg);

        // 跳转到指定路由
        history.push(`/login`);
        //  跳转到指定路由
        // history.push('/trading');
      }


    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.info('changeLoginStatus payload= ', payload);
      setAuthority(payload.data);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
