import request from '@/utils/request';


//  单个股票数据
export async function buySellCont(param) {
  return request(`/stock/info/day/echart/${param.code}/${param.code}`, {
    method: 'GET',
  });
}



//  所有股票数据
export async function buySellContHole(param) {
  return request(`/stock/info/day/echart/hold`, {
    method: 'GET',
  });
}
