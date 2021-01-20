import { Button, InputItem, List, Radio, WingBlank } from 'antd-mobile';
import { connect } from 'umi';
import { message } from 'antd';
import { history } from '@@/core/history';

const RadioItem = Radio.RadioItem;
class Login extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }

  login = () => {

    // 跳转到指定路由
    history.push(`/login`);
  };

  handleClick = () => {
    const { dispatch } = this.props;

    if(this.password.state.value.length<6){

      message.error('密码必须大于6位。');
      return;
    }

    if (this.password.state.value !== this.repassword.state.value) {

      message.error('密码不一致');
      return;

    }
    dispatch({
      type: 'login/register',
      param: { username: this.username.state.value, password: this.password.state.value,sex:'其他',email:this.email.state.value,phone:this.phone.state.value },
    });
    console.info('this.props', this.props);
  };

  render() {
    return (
      <div style={{ marginTop: '200px' }}>

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
            placeholder="确认密码"
            name="repassword"
            ref={el => this.password = el}
          >确认</InputItem>
          <InputItem
            type='password'
            clear
            placeholder="确认密码"
            name="repassword"
            ref={el => this.repassword = el}
          >密码</InputItem>
          <InputItem
            clear
            placeholder="手机"
            name="phone"
            ref={el => this.phone = el}
          >手机</InputItem>
          <InputItem
            clear
            placeholder="邮箱"
            name="email"
            ref={el => this.email = el}
          >邮箱</InputItem>

          <div style={{padding:10,paddingTop:20}}>
            <Button  style={{ position:'absolute',left:100}} type="ghost" size="small" inline onClick={this.handleClick} type="primary">注册</Button>
            <Button  style={{ position:'absolute',right:100}} type="ghost" size="small" inline onClick={this.login} type="primary">登陆</Button>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default connect()(Login);
