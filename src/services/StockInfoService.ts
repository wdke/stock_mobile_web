import request from '@/utils/request';


//  单个股票数据
export async function echartData(param) {
  return request(`/stock/echart/${param.code}/${param.code}`, {
    method: 'GET',
  });
}


//  股票信息列表
export async function stockInfoList(param) {
  return request(`/stock/info/snalysis/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: JSON.stringify({...param}),
  });
}

//  股票信息关键字搜索列表
export async function searchStockInfoList(words) {
  return request(`/stock/info/search/${words}`, {
    method: 'GET',
  });
}

//  所有股票数据
export async function todayHoldPriceVolume(param) {
  return request(`/stock/echart/hold`, {
    method: 'GET',
  });
}

//  新增股票信息
export async function addInfo(param) {
  return request(`/stock/info/add/${param.stockCode}`, {
    method: 'GET',
    // params: param,
  });
}

//  每只股票统计
export async function monthListEchart(param) {
  return request(`/stock/info/month/list/echart`, {
    method: 'GET',
    params: param,
  });
}

//  每只股票差异统计
export async function diffListEchart(param) {
  return request(`/stock/info/diff/list/echart`, {
    method: 'GET',
    params: param,
  });
}
