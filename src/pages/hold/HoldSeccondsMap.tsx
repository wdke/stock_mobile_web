import { connect } from 'umi';
import EchartLineMore from '@/components/echart/EchartLineMore';

const HoldDayMap = ({ dispatch, stockInfoSecconds }) => {


  console.info("stockInfoSecconds=",stockInfoSecconds);

  function initEchartData(data) {
    if (undefined === data) {
      return '';
    }

    const initEchartData = data.map((obj) => (


      <div style={{borderBottom:'1px solid gray',marginBottom:'20px'}}>
        <div>{obj.stockName}最佳交易时间统计</div>
        <EchartLineMore
          title={obj.title}
          id={obj.stockCode}
          legend={obj.legend}
          data={{
            xdata: obj.keys,
            ydata: obj.data,
          }}/>
      </div>
    ));
    return initEchartData;
  }

  return (
    <div style={{ padding: 20 }}>

      {initEchartData(stockInfoSecconds.data)}

    </div>
  );


};

export default connect(({ stockInfoSecconds }) => ({
  stockInfoSecconds,
}))(HoldDayMap);
