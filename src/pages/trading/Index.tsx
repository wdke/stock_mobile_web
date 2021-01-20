import { Button, InputItem, List, ListView, Modal } from 'antd-mobile';
import { connect } from 'umi';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

const Index = ({ dispatch, trading }) => {
  const { list, price, model, id } = trading;
  console.info('hold', trading);


  function onChange(obj) {
    console.info(obj);
    dispatch({
      type: 'trading/save',
      data: { ...obj },
    });

  }


  function remove(id) {
    dispatch({
      type: 'trading/remove',
      id: id,
    });
  }

  function showModal(id) {
    dispatch({
      type: 'trading/save',
      data: { model: true, id },
    });
  }

  function onClose() {
    dispatch({
      type: 'trading/save',
      data: { model: false },
    });
  }


  function handleClick() {
    onClose();
    dispatch({
      type: 'trading/toEnd',
      param: { id, price },
    });

  }

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
            type='digit'
            onChange={obj => {
              onChange({ price: obj });
            }}
            placeholder="请输入股票价格"
          >价格</InputItem>
          <List.Item>

            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
              onClick={handleClick}
            >
              提交
            </div>
          </List.Item>
        </List>

      </Modal>

      {list.map((obj) => {


        return (
          <List renderHeader={() => <span><span>{obj.stockName}</span>&nbsp; &nbsp;
            <span>{obj.stockCode}</span>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <span style={obj.money >= 0 ? { color: 'red', fontSize: 'small'} : {
              color: 'green',
              fontSize: 'small'
            }}>{obj.types === 1 ? '买入' : '卖出'}&nbsp; &nbsp;&nbsp; &nbsp;  {obj.money}</span></span>}>

            <Item>交易数量：{obj.number} </Item>
            <Item>买入价格：{obj.buyPrice}</Item>
            <Item>卖出价格：{obj.sellingPrice}</Item>
            <Item>


              {obj.buyPrice > 0 && obj.sellingPrice > 0 ? '' :<Button type="ghost" size="small" inline onClick={() =>{


                alert('Delete', 'Are you sure???', [
                  { text: 'Cancel', onPress: () => console.log('cancel') },
                  { text: 'Ok', onPress: () => remove(obj.id) },
                ])

              }} style={{ color: 'red' ,position:'absolute',left:50,top:0}}>删除</Button>}
              {obj.buyPrice > 0 && obj.sellingPrice > 0 ? '' : <Button type="ghost" size="small" inline onClick={() => {
                showModal(obj.id);
              }} style={{ position:'absolute',right:50,top:0}}>交易</Button>}

            </Item>
          </List>
        );
      })}


    </div>);

};
export default connect(({ trading }) => ({
  trading,
}))(Index);
