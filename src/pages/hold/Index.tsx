import { Button, List } from 'antd-mobile';
import { connect } from 'umi';
import { monthListEchart } from '@/function/StockFunction';

const Item = List.Item;

const Index = ({ dispatch, hold }) => {
  const { list } = hold;
  console.info('hold', hold);

  const clientWidth = document.documentElement.clientWidth ;
  return (
    <div>

      {list.map((obj) => {


        return (<List
          renderHeader={() => <span><span>{obj.stockName} </span>&nbsp; &nbsp;
            <span>{obj.stockCode}</span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <span style={obj.todayEarningsPercentage >= 0 ? {
              color: 'red',
              fontSize: 'small',
            } : {
              color: 'green',
              fontSize: 'small'
            }}>{obj.todayEarningsPercentage}% &nbsp; &nbsp; &nbsp; &nbsp; {obj.currentTimePrice}</span></span>}>

          <Item >
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>持仓数量：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.holdNumber}</span>
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>持仓价格：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130 ,top:10}}>{obj.currentPrice}</span>

          </Item>

          <Item >
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>累计盈利：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.holdingEarnings}</span>
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>累计占比：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130 ,top:10}}>{obj.holdingEarningsPercentage}%</span>

          </Item>

          <Item>
          <Button type="ghost" size="small" onClick={() => {
            monthListEchart(dispatch, {
              stockCode: obj.stockCode,
              stockType: obj.stockType,
              tradingPrice: obj.currentTimePrice,
            });
          }}>查看最近一年趋势</Button>
          </Item>
        </List>);
      })}

    </div>);

};
export default connect(({ hold }) => ({
  hold,
}))(Index);
