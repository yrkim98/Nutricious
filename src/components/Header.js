import React, { Component } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap/';
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Footer from "./Footer";
import App from "./../App"
import Recipe from "./Recipe"
import RepFinder from "./RepFinder"
import logo from './chef.svg'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {login: this.props.user};
  }
  render() {
    /*return (
      <div>
        <Navbar bg="light" aria-label={'navigation bar'}>
          <Navbar.Brand href="#home">
            <img
              src="/logos/food.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Nutritious logo"
            />
            {'  Nutritious'}
          </Navbar.Brand>
        </Navbar>
      </div>
    );*/
    if (!this.props.userState) {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                  alt="logo"
                  src={logo}
                  width="60"
                  height="60"
                  className=""
                />
              </Navbar.Brand>
          </Navbar>
          </div>
        </Router>
      );
    } else {
      let showName = this.props.userState.displayName;
      if (this.props.userState.displayName == null) {
        showName = 'user';
      }
      return (
        <div>
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                  alt="logo"
                  src={logo}
                  width="60"
                  height="60"
                  className=""
                />
              </Navbar.Brand>
              <div className="d-flex">
                <div>
              <Nav>
                <NavLink to="/home" className="btn btn-outline-info flex-item">Meal Planner</NavLink>
                <NavLink to="/repfind" className="btn btn-outline-info buttone flex-item">Rep Finder</NavLink>
              </Nav>
              </div>

                <Button
                  className="btn btn-danger logoutbutton flex-item buttone"
                  onClick={this.props.logOutFunc}
                >
                  Logout, {showName}
                </Button>
                </div>
          </Navbar>
          <div>
          {this.props.alert}
        </div>
          <Switch>
            //change below for testing
            <Route path='/home' render={(routeProps) => (<Recipe {...routeProps} user={this.props.userState}/>)} />
            <Route path='/repfind' component={RepFinder} />
          </Switch>
          </div>

        </Router>
        </div>
      );
    }
  }
}

export default Header;