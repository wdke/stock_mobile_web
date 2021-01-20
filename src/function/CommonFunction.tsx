import {notification} from 'antd';
import { history } from '@@/core/history';


export function successHandler(data: { code: any, msg: any, data: any }) {


  // 确保数据存在
  if (undefined === data || data === null) {
    return false;
  }


  // 判断code码是否存在
  if (undefined === data.code) {

    notification.error({
      message: `未知错误`,
      description: `数据返回信息：${JSON.stringify(data)}`,
    });

    return false;
  }
  if (data.code === 4001) {
    history.push('/login');
    return false;

  }


  // 判断code码是否是成功
  if (data.code !== 200) {
    notification.error({
      message: `${data.code}`,
      description: `${data.msg}`,
    });
    return false;

  }

  return true;


}

// 数字校验
export function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}


export function initEchart(echarts,id,title,data) {


  // 初始化
  const myChart = echarts.init(document.getElementById(id === undefined ? '1' : id));
  // 绘制图表
  myChart.setOption({
    title: { text: title === undefined ? '' : title },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: {
          show: true,
          type: 'jpg',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: data.xdata === undefined ? [] : data.xdata,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '股票次数',
        type: 'bar',
        data: data.ydata === undefined ? [] : data.ydata,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' },
          ],
        },
      },
    ],
  });
}
