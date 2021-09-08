import React, { Component } from "react"; //import React Component
import { Form, Button} from "react-bootstrap/";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      handle: undefined
    };
  }
  //update state for specific field
  handleChange = event => {
    let field = event.target.name; //which input
    let value = event.target.value; //what value
    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  };

  //handle signUp button
  handleSignUp = event => {
    event.preventDefault(); //don't submit
    this.props.signUpCallback(
      this.state.email,
      this.state.password,
      this.state.handle
    );
  };

  //handle signIn button
  handleSignIn = event => {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  };


  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="handle">User Name</Form.Label>
          <Form.Control
            id="handle"
            name="handle"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group className="float-right">
          <Button onClick={this.handleSignUp}>
            Sign-up
          </Button>{" "}
          <Button onClick={this.handleSignIn}>
            Sign-in
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default SignUpForm;
