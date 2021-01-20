
import request from '@/utils/request';



//  股票信息列表
export async function list(param) {
  return request(`/stock/holdings/list`, {
    method: 'GET',
  });
}

//  新增股票信息
export async function focus(param) {
  return request(`/stock/holdings/focus/${param.stockType}/${param.stockCode}`, {
    method: 'GET',
  });
}


//  股票信息列表
export async function detailById(id) {
  return request(`/stock/holdings/detail/${id}`, {
    method: 'GET',
  });
}
