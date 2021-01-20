import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import { connect } from 'umi';

import {initEchart} from '@/function/CommonFunction'

class EchartLine extends React.Component {
  componentDidMount() {
    // 初始化
    const myChart = echarts.init(document.getElementById(this.props.id === undefined ? '1' : this.props.id));
    // 绘制图表
    myChart.setOption({
      title: { text: this.props.title === undefined ? '' : this.props.title },
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
          data: this.props.data.xdata === undefined ? [] : this.props.data.xdata,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
        },
      ],
      series: [
        {
          name: '股票次数',
          type: 'line',
          data: this.props.data.ydata === undefined ? [] : this.props.data.ydata,
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




  render() {
    return (
      <div id={this.props.id === undefined ? '1' : this.props.id} style={{ width: '100%', height: 300 }}></div>
    );
  }
}

export default connect()(EchartLine);
