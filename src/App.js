import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modals from './components/modal';
import Stepper from './components/stepper';
import WrappedRegistrationForm from './components/registrationForm';

class App extends Component {
  render() {
    return (
      <div>
        <br/><br/><br/><br/>
        <Stepper />
      </div>
    );
  }
}

export default App;
