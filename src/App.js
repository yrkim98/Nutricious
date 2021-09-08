import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./social.css"
import "whatwg-fetch";
import SignUpForm from "./components/signup/SignUpForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";
import { Container, Card, Alert, Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  // check database for the user
  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({ user: firebaseUser, loading: false });
      } else {
        this.setState({ user: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc(); //stop listening for auth changes
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        let firebaseUser = userCredential.user;
        let updatePromise = firebaseUser.updateProfile({
          displayName: handle
        });
        return updatePromise;
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
        this.setState(prevState => {
          let updatedUser = {
            ...prevState.user,
            displayName: prevState.user.displayName
          };
          return { user: updatedUser }; //updating the state
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: "Please enter valid sign-up information. Thank you!"
        });
      });
  };

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({
          errorMessage:
            "Invalid Login: Please check if your log-in info is correct!"
        });
      });
  };

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().signOut();
  };

  handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      this.setState({ errorMessage: 'Invalid Login: Please check if your log-in info is correct!' });
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  render() {
    let content = null; //content to render
    let alert = null; 
    if (!this.state.user) {
      //if logged out, show signup form
      content = (
        <div>
          <Container className="d-flex justify-content-center">
            <Card>
              <Card.Header>
                <h1>Sign Up</h1>
              </Card.Header>
              <Card.Body>
                <SignUpForm
                  signUpCallback={this.handleSignUp}
                  signInCallback={this.handleSignIn}/>
              </Card.Body>
            </Card>
            
          </Container>
          <Container className="text-center">
            <Button className="btn-success justify-center" onClick={this.handleGoogleSignIn}>Google Sign In</Button>
          </Container>
        </div>
      );
    } else {
      if (!this.state.user.emailVerified) {
        alert = ( 
          <Alert className="alert alert-danger">Please verify your email!</Alert>
        );
      }
    }
    // if loading content show spinner
    if (this.state.loading) {
      content = (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only" aria-label="Connecting...">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="h-100">
        <Header userState={this.state.user} logOutFunc={this.handleSignOut} alert={alert}/>
        {this.state.errorMessage && (
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        )}
        <div>
          <div className="py-5">{content}</div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
