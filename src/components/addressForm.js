import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {
  Form, Input, Tooltip, Icon, Select, Button,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class AddressForm extends Component {
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
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input your Name!',
            }],
            initialValue: "Random Name"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address Line 1"
        >
          {getFieldDecorator('address1', {
            rules: [{
              required: true, message: 'Please input your Address!',
            }],
            initialValue: "Random Address Line 1"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Address Line 2"
        >
          {getFieldDecorator('address2', {
            rules: [{
              required: true, message: 'Please input your Address Line 2!',
            }],
            initialValue: "Random Address Line 2"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="City/Town"
        >
          {getFieldDecorator('city/town', {
            rules: [{
              required: true, message: 'Please enter your City/Town!',
            }],
            initialValue: "Random City/Town"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="State"
        >
          {getFieldDecorator('state', {
            rules: [{
              required: true, message: 'Please input your State!',
            }],
            initialValue: "Random State"
          })(
            <Input style={{width:"80%"}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Pincode&nbsp;
              <Tooltip title="Six Digit Pincode">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('pincode', {
            rules: [{ required: true, message: 'Please input your pincode!', whitespace: true }],
            initialValue: "638052"
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
            <Input addonBefore={prefixSelector} style={{ width: '80%' }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" icon="save" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddressForm = Form.create()(AddressForm);

export default WrappedAddressForm;