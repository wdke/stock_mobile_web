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


class EchartBarMore extends React.Component {

  componentDidMount() {
    const corlor=['gray','green','blue','red','gray','green','blue'];
    const { legend, data} = this.props;

    const series = [];
    if (legend !== undefined && legend.length > 0 && undefined !== data && undefined !== data.ydata && data.ydata.length > 0) {



      for(let i=0;i<data.ydata.length;i++){
        series.push({
          name: legend[i],
          type: 'bar',
          smooth: true,
          data: data.ydata[i],
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
        });
      }
    }
    // 初始化
    const myChart = echarts.init(document.getElementById(this.props.id === undefined ? '1' : this.props.id));
    // 绘制图表
    myChart.setOption({
      title: { text: this.props.title === undefined ? '' : this.props.title },
      legend: {
        data: legend === undefined ? [] : legend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap : false,
          axisLine: {
            onZero: false
          },
          data: data.xdata === undefined ? [] : data.xdata,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          splitLine: {
            show: false
          }
        },
      ],
      series: series,
    });
  }


    render(){
      return (
        <div id={this.props.id === undefined ? '1' : this.props.id} style={{ width: '100%', height: 300 }}></div>
      );
    }
  }

export default connect()(EchartBarMore);
