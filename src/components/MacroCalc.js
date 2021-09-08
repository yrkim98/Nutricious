import React, { Component } from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap/';


class MacroCalc extends Component {
    render() {
      return (
        <Form onSubmit={this.props.callback}>
          <Form.Group as={Row} controlId="formAge" aria-label={'Age for macro calulator'}>
            <Form.Label column sm="3">Age</Form.Label>
            <Col sm="9">
              <Form.Control name="age" type="age" placeholder="Years" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGender" aria-label={'Gender for macro calulator'}>
            <Form.Label column sm="3">Gender</Form.Label>
            <Col sm="9">
              <Form.Control name="gender" as="select">
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAge" aria-label={'Height for macro calulator'}>
            <Form.Label column sm="3">Height</Form.Label>
            <Col sm="9">
              <Form.Row>
                <Col>
                  <Form.Control name="feet" placeholder="Feet" />
                </Col>
                <Col>
                  <Form.Control name="inches" placeholder="Inches" />
                </Col>
              </Form.Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAge" aria-label={'Weight for macro calulator'}>
            <Form.Label column sm="3">Weight</Form.Label>
            <Col sm="9">
              <Form.Control type="weight" name="weight" placeholder="lbs" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGoal" aria-label={'Goals for macro calulator'}>
            <Form.Label column sm="3">Goals</Form.Label>
            <Col sm="9">
              <Form.Control name="goals" as="select">
                <option value={0.8}>Lose Weight</option>
                <option value={1}>Maintain</option>
                <option value={1.2}>Build Muscle</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formMeals" aria-label={'Exercise Level for macro calulator'}>
            <Form.Label column sm="3">Exercise Level</Form.Label>
            <Col sm="9">
              <Form.Control name="level" as="select">
                <option value={1.2}>Sedentary</option>
                <option value={1.375}>Lightly active</option>
                <option value={1.55}>Moderately Active</option>
                <option value={1.725}>Very Active</option>
                <option value={1.9}>Extremely Active</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group>
            <Button type="submit" className="float-right" variant="primary" onClick={this.props.close} aria-label={'Submit data for macro calulator'}>Get Calories</Button>
          </Form.Group>
        </Form>
      );
    }
  }
    
  export default MacroCalc;