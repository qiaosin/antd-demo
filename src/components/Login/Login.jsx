import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { loginUser } from './../../actions/auth';

import './Login.css';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginFaileCallback = this.loginFaileCallback.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(loginUser(creds, this.loginFaileCallback));
    });
  }

  loginFaileCallback(username, message){
    const { setFields } = this.props.form;
    const newValue = {
      username: {
        name: "username",
        validating: false,
        value: username,
        errors: [message]
      }
    };
    setFields(newValue);
  }

  render() {
    const { getFieldProps } = this.props.form;
    const userProps = getFieldProps('username', {
      validate: [{
        rules: [
          { required: true ,message:'用户名不能为空'}
        ],
        trigger: 'onBlur'
      }]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, min: 0, message: '密码不能为空' }
      ]
    });

    return (
      <div className="login-container">
        <div className="login-mask"/>
        <Form className="login-content" horizontal onSubmit={this.handleSubmit}>
          <h2>新考勤系统</h2>
          <FormItem label="账号" hasFeedback>
            <Input
              {...userProps}
              placeholder="请输入账号"
              type="text"
            />
          </FormItem>
          <FormItem label="密码" hasFeedback>
            <Input {...passwordProps} type="password" autoComplete="off" placeholder="请输入密码"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
          </FormItem>
          <FormItem>
            <Button className="ant-col-24" type="primary" htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Login));
