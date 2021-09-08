import React, { Component } from "react";
import MealCard from "./MealCard";
import { Row, Container, Alert } from "react-bootstrap/";
import firebase from "firebase/app";

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = { meals: [] }; //initialize as empty!
  }

  componentDidMount() {
    console.log(this.props.user);
    this.mealRef = firebase
      .database()
      .ref("users/" + this.props.user.displayName);
    this.mealRef.on("value", snapshot => {
      let value = snapshot.val();
      console.log("value is now: ", value);
      this.setState({ meals: value });
    });
  }

  componentWillUnmount() {
    this.mealRef.off();
  }

  render() {
    console.log(this.state.meals);
    if (!this.state.meals || this.state.meals.length < 1) {
      return <Alert className={"text-center"}>No Meals Generated.</Alert>;
    }
    let fave =
      this.state.meals.faves !== undefined ? this.state.meals.faves : undefined;
    return (
      <Container aria-label={"Generated list of meals"}>
        <Row className="justify-content-center">
          <MealCard
            key={"breakfast"}
            recipe={this.state.meals.breakfast}
            user={this.props.user}
            type={"breakfast"}
            faves={fave ? fave.breakfast : undefined}
          />
          <MealCard
            key={"lunch"}
            recipe={this.state.meals.lunch}
            user={this.props.user}
            type={"lunch"}
            faves={fave ? fave.lunch : undefined}
          />
          <MealCard
            key={"dinner"}
            recipe={this.state.meals.dinner}
            user={this.props.user}
            type={"dinner"}
            faves={fave ? fave.dinner : undefined}
          />
          {this.state.meals.snacks ? (
            <MealCard
              key={"snack"}
              recipe={this.state.meals.snacks}
              user={this.props.user}
              type={"snack"}
              faves={fave ? fave.snack : undefined}
            />
          ) : (
            ""
          )}
        </Row>
      </Container>
    );
  }
}

export default MealList;
