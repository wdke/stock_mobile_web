import { connect } from 'umi';
import EchartBar from '@/components/echart/EchartBar';

interface echartDataType {
  key: string[];
  value: string[];
  code: string;
}

const HoldPrice = ({ dispatch, stock }) => {

  const echartData: echartDataType[] = stock.data;

  console.info(echartData);

  function initEchartData(data) {
    if (undefined === data) {
      return '';
    }

    const initEchartData = echartData.map((obj) => (
      <EchartBar
        title={obj.title}
        id={obj.stockCode}
        data={{
          xdata: obj.keys,
          ydata: obj.values,
        }}/>
    ));
    return initEchartData;
  }

  return (
    <div style={{padding:20}}>

      {initEchartData(echartData)}

    </div>
  );


};

export default connect(({ stock }) => ({
  stock,
}))(HoldPrice);
