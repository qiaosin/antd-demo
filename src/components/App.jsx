import React, { Component, PropTypes } from 'react';

import styles from './mainLayout.less';
import AppMenu from '../components/menus';
import {Menu} from 'antd';
import { connect } from 'react-redux'
import icon from './img/logo.png'
import defaultUser from './img/defaultUser.jpg'
import Login from './Login/Login.jsx';
import { logoutUser } from './../actions/auth';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
class App extends Component{
  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    const { isAuthenticated } = this.props.auth.toJS();
    this.state = {
      collapse: false
    };
  }
  handleMenuClick(e){
    const { dispatch } = this.props;
    if(e.key === 'logout'){
      console.log(logoutUser)
      dispatch(logoutUser());
    }
  }
  
  renderAuthenticatedPage(){
    return (
      <div className={styles.normal}>
        <div className={styles.head} id="react-top">
          <div className={styles.logo} >
            <a href="#" ><img src={icon} height="34" /></a>
          </div>
          <div className={styles.rightnav}>
              <Menu  
                mode="horizontal" theme="dark" style={{lineHeight:"44px",height:44}}
                onClick={this.handleMenuClick}>
                <SubMenu title={<span><img height="24" src={defaultUser} style={{marginRight:8,borderRadius:'50%',verticalAlign: 'middle'}} />管理员</span>}>
                 <Item key="logout">注销</Item>
                  <Menu.Divider />
                  <Item key="user">个人中心</Item>
                  <Menu.Divider />
                  <Item key="about">关于</Item>
                  <Menu.Divider />
                  <Item key="help">帮助</Item>
                </SubMenu>
              </Menu>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.side} id="react-menu">
            <AppMenu current="sub1,sub2"/>
          </div>
          <div className={styles.main} id="react-content">
            {this.props.children}
          </div>
        </div>
        <div className={styles.foot} id="react-bottom">
          2016 © EVUN | 考勤管理系统
        </div>
      </div>
    )
  }




  render(){
    const { isAuthenticated } = this.props.auth.toJS();
    return (
      <div style={{height:'100%'}}>
        {isAuthenticated? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
};

App.propTypes = {
  //TODO
  isAuthenticated: React.PropTypes.bool
};

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(App)
