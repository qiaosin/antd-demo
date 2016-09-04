import React , { Component, PropTypes } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import * as reportActionCreators from '../../actions/reports';
import { bindActionCreators } from 'redux'

import PureComponent from '../PureComponent';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
}];



class Report extends PureComponent{

  constructor(props) {
    super(props);
    const {items} = this.props.reportManage.toJS();
    //const {getDataList} = this.props.actions;
    //actions.getDataList();
    //getDataList();
  }

  componentDidMount(){
    
  }
  initData(){
    const {getDataList} = this.props.actions;
    getDataList();
  }
  render() {
  	const {items} = this.props.reportManage.toJS();
    return (
      <div>
        <div onClick={this.initData.bind(this)}>初始化</div>
        <Table columns={columns} dataSource={items} 
                 rowKey={this.key}
                 scroll={{ x: true, y: 300 }} size='middle'/>
      </div>
    );
  }
}

Report.propTypes = {
  //TODO
};


function mapStateToProps(state) {
  return {reportManage:state.reportManage};
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(reportActionCreators, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Report)