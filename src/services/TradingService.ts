import request from '@/utils/request';


//  买入
export async function add(param) {
  return request(`/stock/trading/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: JSON.stringify({ ...param }),
  });
}


//  删除
export async function remove(id) {
  return request(`/stock/trading/remove/${id}`, {
    method: 'GET',
  });
}


//  撤销
export async function undo(id) {
  return request(`/stock/trading/undo/${id}`, {
    method: 'GET',
  });
}

//  完成
export async function complete(id) {
  return request(`/stock/trading/complete/${id}`, {
    method: 'GET',
  });
}


//  完成
export async function toEnd(param) {
  return request(`/stock/trading/toEnd/${param.id}`, {
    method: 'GET',
    params:param,
  });
}

//  列表
export async function list() {
  return request(`/stock/trading/list`, {
    method: 'GET',
  });
}


//  历史交易列表
export async function holdList() {
  return request(`/stock/trading/held/list`, {
    method: 'GET',
  });
}
