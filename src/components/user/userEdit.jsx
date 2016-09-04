import React, { Component, PropTypes } from 'react';
import {Form,Input,Button,InputNumber,Radio,Table, Icon,message} from 'antd';
import { connect } from 'react-redux';
import * as userActionCreators from '../../actions/user';
import {changeRoute} from '../../actions/route';
import {URI_USER_LIST} from '../../constant/uriConfig';
import { bindActionCreators } from 'redux';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserEdit extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const isAdd = !this.props.params.id;
    if(!isAdd){
      const id = this.props.params.id;
      const user = this.props.userManage.items.find(user => user.id == id);
      if(user){
        this.props.form.setFieldsValue(user);
      }
    }
  }

  onReturn(e){
    e.preventDefault();
    this.props.changeRoute(URI_USER_LIST);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('this.props',this.props);
    const user = this.props.form.getFieldsValue();
    const isAdd = !this.props.params.id;
    const {saveOrUpdate} = this.props.actions;
    this.props.form.validateFieldsAndScroll(function(errors,values){
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      saveOrUpdate(isAdd,user);
    });
  }

  checkAge(rule,value,callback){
    if(value == null || value == '' ){
       callback(new Error('年龄不能为空!'));
       return;
    }
    //判断是否为数字
    callback();
  }

  render(){
    const {getFieldProps} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="姓名"  {...formItemLayout}>
          <Input {...getFieldProps('name',{initialValue:'',rules:[{required:true,message:'姓名不能为空!'}]})} placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="性别"  {...formItemLayout}>
          <RadioGroup {...getFieldProps('sex',{initialValue:'male'})}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="年龄" {...formItemLayout}>
            <InputNumber {...getFieldProps('age',{initialValue:'',rules:[{required:true,validator:this.checkAge}]})} min={0}max={100}/>
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
           <Button type="primary" htmlType="submit">确定</Button>
            &nbsp;&nbsp;&nbsp;
           <Button type="ghost" onClick={this.onReturn.bind(this)}>返回</Button>
           <Input {...getFieldProps('id')} style={{display:'none'}}/>
        </FormItem>
      </Form>
    )
  }
};

UserEdit = Form.create()(UserEdit);

UserEdit.propTypes = {
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute:bindActionCreators(changeRoute,dispatch),
    actions:bindActionCreators(userActionCreators,dispatch)
  }
}

function mapStateToProps(state) {
  return {userManage:state.userManage};
}
export default connect(mapStateToProps,mapDispatchToProps)(UserEdit)
