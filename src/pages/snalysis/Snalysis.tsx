import { Radio,  List, Button, InputItem, Modal } from 'antd-mobile';
import { connect } from 'umi';
import { monthListEchart,focus } from '@/function/StockFunction';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

const Snalysis = ({ dispatch, stockInfo }) => {
  console.info('stockInfo=', stockInfo);
  const {visible,condition ,model, stockCode,stockType,tradingNumber,tradingPrice,types} = stockInfo;
  const { stockName}=condition;

  let { list} = stockInfo.pageInfo;
  if (undefined === list) {
    list = [];
  }


  function showModal(a,b,c) {
    dispatch({
      type: 'stockInfo/save',
      data: { model: true ,stockCode:a,stockType:b,tradingPrice:c},
    });
  }

  function onClose() {
    dispatch({
      type: 'stockInfo/save',
      data: { model: false },
    });
  }




  function handleClick() {
    onClose();
    dispatch({
      type: 'trading/add',
      param: { stockCode,stockType,tradingNumber,tradingPrice,types },
    });
  }


  function onChange(obj) {
    console.info(obj);
    dispatch({
      type: 'stockInfo/save',
      data: { ...obj },
    });

  }


  function search(obj) {
    onChange({stockName: obj});
    dispatch({
      type: 'stockInfo/stockInfoList', query: {
        stockName: obj,
      },
    });
  }
  const clientWidth = document.documentElement.clientWidth;

  return (
    <div>

      <Modal
        popup
        visible={model}
        onClose={onClose}
        animationType="slide-up"
      >
        <List>
          <InputItem
            clear
            defaultValue={tradingPrice}
            type={'digit'}
            onBlur={obj => {
              onChange({ tradingPrice: obj });
            }}
            placeholder="请输入股票价格"
          >价格</InputItem>
          <InputItem
            clear
            defaultValue={tradingNumber}
            type={'digit'}
            onBlur={obj => {
              onChange({ tradingNumber: obj });
            }}
            placeholder="请输入买入数量"
          >数量</InputItem>
          <List.Item>

            <RadioItem key={1} checked={types === 1} onChange={() => onChange({ types: 1 })}>
              买入
            </RadioItem>
            <RadioItem key={2} checked={types === 2} onChange={() => onChange({ types: 2 })}>
              卖出
            </RadioItem>
            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center',padding:20 }}
              onClick={handleClick}
            >
              提交
            </div>
          </List.Item>
        </List>

      </Modal>

      <InputItem
        clear
        defaultValue={stockName}
        onBlur={obj => {
          search(obj);
          onChange(obj);
        }}

        onVirtualKeyboardConfirm={obj => {
          search(obj);
          onChange(obj);
        }}
        placeholder="搜索"
      />

      {list.map((obj) => {

        return <List renderHeader={() => <span><span
          style={{ fontSize: 'large' }}>{obj.stockName}</span><span>{obj.stockCode}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <span style={obj.diff >= 0 ? { color: 'red', fontSize: 'small' } : {
            color: 'green',
            fontSize: 'small'
          }}>{obj.diff}% &nbsp; &nbsp; {obj.lastClose}</span></span>}>

            <Item >
              <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>3日涨跌：</span>
              <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.diff3}%</span>
              <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>5日涨跌：</span>
              <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130 ,top:10}}>{obj.diff5}%</span>

            </Item>
            <Item >
              <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>30日涨跌：</span>
              <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.diff30}%</span>
              <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>连续涨跌：</span>
              <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130,top:10}}>{obj.continueDays}天</span>
            </Item>


          <Item >
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>30日涨：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.risingDaysNear}天</span>
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>30日跌：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130,top:10}}>{obj.fallDaysNear}天</span>
          </Item>

          <Item >
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>30日高：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.highPriceNear}</span>
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>日期：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130,top:10}}>{obj.highDayNear}</span>
          </Item>

          <Item >
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: clientWidth-100,top:10 }}>30日低：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: 80 ,top:10}}>{obj.lowPriceNear}</span>
            <span style={{ color: 'gray' ,fontSize:'medium',position: 'absolute', right: 110,top:10 }}>日期：</span>
            <span style={{ color: 'gray',fontSize:'medium' ,position: 'absolute', left: clientWidth-130,top:10}}>{obj.lowDayNear}</span>
          </Item>

          <Item>
            <Button type="ghost" size="small" inline onClick={() => {
              showModal(obj.stockCode,obj.stockType,obj.lastClose);
            }} style={{ position:'absolute',left:50,top:0}}>交易</Button>

            <Button type="ghost" size="small" inline onClick={() => {
              focus(dispatch, {
                stockCode: obj.stockCode,
                stockType: obj.stockType
              });
            }} style={{ position:'absolute',left:130,top:0}}>收藏</Button>

            <Button type="ghost" size="small" inline  style={{ position:'absolute',right:50,top:0}} onClick={() => {
              monthListEchart(dispatch, {
                stockCode: obj.stockCode,
                stockType: obj.stockType,
                tradingPrice: obj.currentTimePrice,
              });
            }}>查看最近一年趋势</Button>
          </Item>
        </List>;
      })}


    </div>);

};
export default connect(({ stockInfo }) => ({
  stockInfo,
}))(Snalysis);
