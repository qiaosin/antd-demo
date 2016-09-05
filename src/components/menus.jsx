import React, {Component, PropTypes} from 'react';
import {Menu, Icon} from 'antd';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import {changeRoute} from '../actions/route';
import * as path from '../constant/uriConfig';
import {bindActionCreators} from 'redux';
import xFetch from './../services/xFetch';
import { API_CONFIG } from './../config/api';

const SubMenu = Menu.SubMenu;
class AppMenu extends Component {
  componentWillMount(){

  }
  componentDidMount(){
    this.getMenu();
    console.log('componentDidMount');
  }

  constructor(props) {
    super(props);
    const {current} = props;
    this.state = {
      current:current.split(","),
      menustate:false,
      menulist:[]
    }
  }

  handleClick(e) {
    this.props.changeRoute(e.key);
  }
  getMenu(){
    xFetch(API_CONFIG.menu, { method: "POST" }).then((response) => {
      if (response.jsonResult.success) {
       let menu = this.getSubMenus(response.jsonResult.menulist);
       //this.props.menulist = menu;
       this.setState({
          menustate:true,
          menulist:menu
       })
      } 
    });
  }
  getSubMenus(menus){
    return menus.map((menu,index)=>{
      let code = menu.code,
        title = menu.title,
        url = menu.url,
        subMenus = menu.subMenus
      if(subMenus){
        return (<SubMenu key={code} title={<span><span>{title}</span></span>} >   
          {::this.getSubMenus(subMenus)}
        </SubMenu>)
      }
      else {
        return (
          <Menu.Item key={code} >{title}</Menu.Item>
        ) 
      }
    });
  }
  componentWillReceiveProps(props) {
    if(props.path == ''){
      return;
    }
    hashHistory.push(props.path);
  }

  render() {

    let submenu = this.state.menulist;

    
      if(this.state.menustate){
       return ( <Menu mode="inline" onClick={this.handleClick.bind(this)} defaultOpenKeys={this.state.current} theme="white"
            selectedKeys={this.state.current}>
        {/*<SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
          <Menu.Item key={path.URI_USER_LIST}>用户管理</Menu.Item>
          <Menu.Item key={path.URI_SAVE_OR_UPDATE_USER}>增加用户</Menu.Item>
          <Menu.Item key={path.URI_REPORTS}>报表</Menu.Item>
          <Menu.Item key="4">选项4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <SubMenu key="sub3" title="三级导航">
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
        </SubMenu>*/}
        {submenu}
      </Menu>
      );
      }else return <div></div>;
      
  };
}

AppMenu.propTypes = {
  current: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {path:state.path};
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute:bindActionCreators(changeRoute,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppMenu)
