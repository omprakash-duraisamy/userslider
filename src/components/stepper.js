
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Steps, Button, message } from 'antd';
import WrappedRegistrationForm from './registrationForm';

const Step = Steps.Step;

const steps = [{
  title: 'User Data',
  content: <div><h1>Basic User Form</h1><WrappedRegistrationForm /></div>,
}, {
  title: 'Address',
  content: <h1>ADDRESS Form</h1>,
}, {
  title: 'Payment Options',
  content: <h1>Payment Form</h1>,
}];

class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

export default Stepper;
          