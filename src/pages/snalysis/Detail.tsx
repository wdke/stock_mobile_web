import { connect } from 'umi';
import EchartLine from '@/components/echart/EchartLine';
import { Radio, List, InputItem, WhiteSpace, Modal, Button } from 'antd-mobile';
import EchartBarMore from '@/components/echart/EchartBarMore';

const RadioItem = Radio.RadioItem;

const Detail = ({ dispatch, stockInfoMonth }) => {

  const { model, stockCode, stockType, tradingNumber, tradingPrice, types } = stockInfoMonth;

  console.info('Detail', stockInfoMonth.data);

  function showModal() {
    dispatch({
      type: 'stockInfoMonth/save',
      data: { model: true },
    });
  }

  function onClose() {
    dispatch({
      type: 'stockInfoMonth/save',
      data: { model: false },
    });
  }


  function onChange(obj) {
    console.info(obj);
    dispatch({
      type: 'stockInfoMonth/save',
      data: { ...obj },
    });

  }


  function handleClick() {
    onClose();
    dispatch({
      type: 'trading/add',
      param: { stockCode, stockType, tradingNumber, tradingPrice, types },
    });
  }

  // 单个折线图
  function initEchartData(data) {
    if (undefined === data) {
      return '';
    }

    let i = 0;
    const initEchartData = data.data.map((obj) => (
      <EchartLine
        title={data.legend[i]}
        id={data.stockCode + (i++)}
        data={{
          xdata: data.keys,
          ydata: obj,
        }}/>
    ));
    return initEchartData;
  }


  // 多个折线图

  function initEchartMoreLine(data) {
    if (undefined === data) {
      return '';
    }

    console.info("initEchartMoreLine",data);
    let i = 0;
    const initEchartData = data.map((obj) => (


      <div style={{ borderBottom: '1px solid gray', marginBottom: '20px' }}>
        <div>{obj.stockName}</div>
        <EchartBarMore
          title=""
          id={'more_' + obj.stockCode + i++}
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

    <div>
      <div>


        <Button onClick={showModal}>交易</Button>

      </div>
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
              style={{ width: '100%', color: '#108ee9', textAlign: 'center', padding: 20 }}
              onClick={handleClick}
            >
              提交
            </div>
          </List.Item>
        </List>

      </Modal>

      <div style={{ height: document.documentElement.clientHeight - 100, overflow: 'auto' }}>
        {initEchartData(stockInfoMonth.data)}

        {initEchartMoreLine(stockInfoMonth.diffs)}
      </div>
    </div>
  );


};

export default connect(({ stockInfoMonth }) => ({
  stockInfoMonth,
}))(Detail);
