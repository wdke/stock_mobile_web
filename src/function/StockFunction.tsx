import { history } from '@@/core/history';

export function monthListEchart(dispatch,data) {

  // 跳转到指定路由
  history.push(`/snalysis/detail?stockCode=${data.stockCode}&stockType=${data.stockType}&tradingPrice=${data.tradingPrice}`);
};
export function focus(dispatch,data) {
  dispatch({
    type: 'hold/focus',
    param: { ...data },
  });
};
