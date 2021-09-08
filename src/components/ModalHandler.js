import React, { Component } from 'react';
import MacroCalc from './MacroCalc';
import { Button, Modal } from 'react-bootstrap/';


class ModalHandler extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    //   constructs a modal with methods to open and close
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Macronutrient Calculator
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Macro Calculator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MacroCalc callback={this.props.callback} close={this.handleClose}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalHandler;