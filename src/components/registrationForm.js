import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {
  Form, Input, Tooltip, Icon, Select, Button,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateDateOfBirth = (rule, value, callback) => {
      const form = this.props.form;
    var dob = new Date(form.getFieldValue('dob'));
    var today = new Date();
    if(dob>today){
        callback('DOB can\'t be a future date!');
    }
    callback();
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  verifyPhone = (rule, value, callback) => {
    const form = this.props.form;
    if (value && form.getFieldValue('phone').toString().length !== 10){
      callback('Enter a valid phone number')
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+91">+91</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
            initialValue: "hello@gmail.com"
          })(
            <Input style={{width:"80%"}} disabled/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date of Birth"
        >
          {getFieldDecorator('dob', {
            rules: [{
              required: true, message: 'Please input your DOB!',
            }, {
              validator: this.validateDateOfBirth,
            }],
          })(
            <Input type="date" style={{width:"80%"}} max={new Date()}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender"
        >
          {getFieldDecorator('gender', {
            rules: [{
              required: true, message: 'Please input your Gender!',
            }],
          })(
            <Select style={{width:"80%"}}>
              <Option value="male" selected>Male</Option>
              <Option value="female">Female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }]
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            initialValue: "Jhony"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
            {
              validator: this.verifyPhone
            }],
            initialValue: 9790434518
          })(
            <Input addonBefore={prefixSelector} style={{ width: '80%' }} disabled />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" icon="save" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;