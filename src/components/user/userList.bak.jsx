import React, { Component, PropTypes } from 'react';
import {Form,Input,Button,InputNumber,Radio,Table, Icon,Col,Row, Popconfirm, message} from 'antd';
import { connect } from 'react-redux';
import {queryUsers,deleteUser} from '../../actions/user';
import {changeRoute} from '../../actions/route';
import {URI_SAVE_OR_UPDATE_USER} from '../../constant/uriConfig';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SearchForm extends Component{
  componentDidMount(){
    //TODO
  }

  handleSubmit(e) {
    e.preventDefault();
    let {userName,sex} = this.props.form.getFieldsValue();
    this.props.handleSearch(userName,sex);
  }

  render(){
    const {getFieldProps} = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit.bind(this)} form={this.props.form}>
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
        <Button  htmlType='submit' type="primary">查询</Button>
        <span>   </span>
        <Button  htmlType='submit' type="ghost" onClick = {this.props.handleAdd}>增加</Button>
      </Form>
    )
  }
}

SearchForm.propTypes = {
  handleSearch : React.PropTypes.func.isRequired,
  handleAdd : React.PropTypes.func.isRequired
};
SearchForm = Form.create()(SearchForm);

class UserTable extends Component{
  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
    this.edit = this.edit.bind(this);
    const pagination = {
      size: "small",
      total: props.datas.length,
      pageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total)=>'共' + total + '条',
      onShowSizeChange(current, pageSize) {
        props.handlePageChange(current,pageSize);
      },
      onChange(current) {
        props.handlePageChange(current,this.pageSize);
      }
    };
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
            <a href="javascript:void(0);" onClick={this.edit.bind(this, record)}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm title="确定要删除这条记录吗？" onConfirm={this.del.bind(this, record)}>
              <a href="javascript:void(0);">删除</a>
            </Popconfirm>
          </span>
        )
      }];

    this.state = {
      datas: props.datas,
      loading: props.loading,
      columns: titleColumns,
      pagination: pagination
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      datas: props.datas,
      loading: props.loading
    })
  }

  del(record) {
    this.props.handleDeleteUser(record.id);
  }

  edit(record) {
    this.props.handleEditUser(record.id)
  }

  generateRowKey(record, index) {
    return record.id;
  }

  render() {
    return (
      <Table columns={this.state.columns} dataSource={this.state.datas} loading={this.state.loading}
             pagination = {this.state.pagination}
             rowKey={this.generateRowKey}
             scroll={{ x: true, y: 300 }} size='middle'
             expandedRowRender={record => '测试:' + record.name}/>
    )
  }
}

UserTable.propTypes = {
  datas:PropTypes.array.isRequired,
  loading:PropTypes.bool.isRequired,
  handleEditUser:PropTypes.func.isRequired,
  handleDeleteUser:PropTypes.func.isRequired,
  handlePageChange:PropTypes.func.isRequired
}

class UserList extends Component {
  onPageChange(current,pageSize){
    //search datas
    console.log("test:",'current:',current,'pageSize:',pageSize);
  }

  onSearch(name, sex) {
    const {dispatch} = this.props;
    dispatch(queryUsers({name: name, sex: sex}));
  }

  onEdit(id) {
    const {dispatch} = this.props;
    dispatch(changeRoute(URI_SAVE_OR_UPDATE_USER + '/' + id));
  }

  onAdd(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(changeRoute(URI_SAVE_OR_UPDATE_USER));
  }

  onDelete(id) {
    const {dispatch} = this.props;
    dispatch(deleteUser(id));
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <SearchForm handleSearch={this.onSearch.bind(this)} handleAdd={this.onAdd.bind(this)}/>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col span={24}>
            <UserTable datas={this.props.userManage.items} loading={this.props.userManage.loading}
                       handleEditUser = {this.onEdit.bind(this)}
                       handleDeleteUser = {this.onDelete.bind(this)}
                       handlePageChange = {this.onPageChange.bind(this)}/>
          </Col>
        </Row>
      </div>
    )
  }
};

UserList.propTypes = {
  //TODO
};

function mapStateToProps(state) {
  const {userManage} = state;
  return {userManage, path: state.path};
}

export default connect(mapStateToProps)(UserList)
