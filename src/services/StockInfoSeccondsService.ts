import request from '@/utils/request';


//  单个股票数据
export async function comparingThreeDays(param) {
  return request(`/stock/info/secconds/echart/${param.code}/${param.code}`, {
    method: 'GET',
  });
}



//  所有股票数据
export async function comparingThreeDaysHole(param) {
  return request(`/stock/info/secconds/echart/hold`, {
    method: 'GET',
  });
}
