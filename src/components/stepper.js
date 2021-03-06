import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Steps, Button, message } from 'antd';
import WrappedRegistrationForm from './registrationForm';
import WrappedAddressForm from './addressForm';
import AddressPage from './addressPage';

const Step = Steps.Step;

const steps = [{
  title: 'User Data',
  content: <div><WrappedRegistrationForm /></div>
//    content:<AddressPage/>
}, {
  title: 'Address',
  content:<AddressPage/>
//  content: <div><WrappedAddressForm /></div>,
}, {
  title: 'Payment Options',
//  content:<AddressPage/>
  content: 'Payment Form',
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
          {steps.map(item => <Step key={item.title} title={(steps[current].title===item.title)?<h2>{item.title}</h2>:item.title} />)
        }
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current > 0
            && (
            <Button icon="arrow-left" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Prev
            </Button>
            )
          }
          {
            current < steps.length - 1
            && <Button type="primary" style={{ marginLeft: 8 }} icon="arrow-right" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" style={{ marginLeft: 8 }} icon="file-done" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
        </div>
      </div>
    );
  }
}

export default Stepper;
          