import { Button, InputItem, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'umi';
import { history } from '@@/core/history';

class Login extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }


  register = () => {

    // 跳转到指定路由
    history.push(`/register`);
  };


  handleClick = () => {
    const {dispatch}=this.props;
    dispatch({
      type: 'login/login',
      payload: { username:this.username.state.value,password:this.password.state.value},
    });
    console.info("this.props",this.props)
  }
  render() {
    return (
        <div style={{marginTop:'200px'}}>

          <WingBlank>
            <InputItem
              clear
              placeholder="用户名"
              name="username"
              ref={el => this.username = el}
            >用户名</InputItem>
            <InputItem
              type='password'
              clear
              placeholder="密码"
              name="password"
              ref={el => this.password = el}
            >密码</InputItem>
            <div style={{padding:10,paddingTop:20}}>
              <Button  style={{ position:'absolute',left:100}} type="primary" size="small" inline onClick={this.handleClick}>登陆</Button>
              <Button  style={{ position:'absolute',right:100}} type="primary" size="small" inline onClick={this.register}>注册</Button>
            </div>
          </WingBlank>
        </div>
    );
  }
}

export default connect()(Login);
