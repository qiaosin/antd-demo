import React, { Component, PropTypes } from 'react';
import {Form,Input,Button,InputNumber,Radio,Table, Icon,Col,Row, Popconfirm, message} from 'antd';
import { connect } from 'react-redux';
import {URI_SAVE_OR_UPDATE_USER} from '../../constant/uriConfig';
import * as userActionCreators from '../../actions/user';
import {changeRoute} from '../../actions/route';
import { bindActionCreators } from 'redux'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserList extends Component{
  constructor(props) {
    super(props);
    const {items,loading} = this.props.userManage;
    const titleColumns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        filters: [{text: '男', value: 'male'}, {text: '女', value: 'female'}],
        render: (text, record, index)=> {
          if (text == 'male') {
            return <font color='red'>男</font>
          } else {
            return <font color='green'>女</font>
          }
        },
        onFilter: (value, record) => record.sex.indexOf(value) === 0
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <a href="javascript:void(0);" onClick={this.onEdit.bind(this,record.id)}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm title="确定要删除这条记录吗？" onConfirm={this.onDelete.bind(this,record.id)}>
              <a href="javascript:void(0);">删除</a>
            </Popconfirm>
          </span>
        )
      }];

    this.state = {
      columns: titleColumns
    }
    this.pageSize = 10;
  }

  onPageChange(current,pageSize){
    this.pageSize = pageSize;
    this.doSearch(current);
  }

  onSearch(e) {
    e.preventDefault();
    console.log("on search this props:",this.props);
    this.doSearch(0);
  }

  doSearch(current){
    let {userName,sex} = this.props.form.getFieldsValue();
    const {queryUsers} = this.props.actions;
    queryUsers({name: userName, sex: sex,start:current,limit:this.pageSize});
  }

  onEdit(id){
    this.props.changeRoute(URI_SAVE_OR_UPDATE_USER + '/' + id);
  }

  onAdd(e) {
    e.preventDefault();
    this.props.changeRoute(URI_SAVE_OR_UPDATE_USER)
  }

  onDelete(id) {
    const {deleteUser} = this.props.actions;
    deleteUser(id);
  }

  componentWillReceiveProps(props) {
    //this.total = props.userManage.total;
  }

  generateRowKey(record, index) {
    return record.id;
  }

  render() {
    const {columns} = this.state;
    const {getFieldProps} = this.props.form;
    const {items:userDatas,loading,total} = this.props.userManage;
    const pageSize = this.pageSize;
    const pagination = {
      size: "small",
      total: total,
      pageSize: pageSize,
      //defaultCurrent:defaultCurrent,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total)=>'共' + total + '条',
      onShowSizeChange:(current, pageSize)=>{
        this.onPageChange(current,pageSize);
      },
      onChange:(current)=>{
        this.onPageChange(current,pagination.pageSize);
      }
    };
    return (
    <div>
      <Row>
        <Col span={24}>
          <Form inline onSubmit={this.onSearch.bind(this)} form={this.props.form}>
            <FormItem label="姓名">
              <Input {...getFieldProps('userName',{initialValue:''})} placeholder="请输入姓名"/>
            </FormItem>
            <FormItem label="性别">
              <RadioGroup {...getFieldProps('sex',{initialValue:''})}>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
                <Radio value="">所有</Radio>
              </RadioGroup>
            </FormItem>
            <Button htmlType='submit' type="primary">查询</Button>
            <span>   </span>
            <Button htmlType='submit' type="ghost" onClick = {this.onAdd.bind(this)}>增加</Button>
          </Form>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={24}>
          <Table columns={columns} dataSource={userDatas} loading={loading}
                 pagination = {pagination}
                 rowKey={this.generateRowKey}
                 scroll={{ x: true, y: 300 }} size='middle'
                 expandedRowRender={record => '测试:' + record.name}/>
        </Col>
      </Row>
    </div>
    )
  }
}

UserList.propTypes = {
  //TODO
};

UserList = Form.create()(UserList);

function mapStateToProps(state) {
  return {userManage:state.userManage};
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(userActionCreators, dispatch),
      changeRoute:bindActionCreators(changeRoute,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)
