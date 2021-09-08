import React, { Component } from "react";
import MealList from "./MealList";
import ModalHandler from "./ModalHandler";
import { Form, Row, Col, Button, Container, Jumbotron } from "react-bootstrap/";
import firebase from "firebase/app";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  //  this method updates the state to get the values of the user entered information on calculator
  handleChange = event => {
    event.preventDefault();
    this.formula(event);
  };
  // this method is used to handle a fetch submit when the user enters calorie range
  handleSubmit = event => {
    event.preventDefault();
    let portion = Math.round(
      event.target.cals.value / event.target.meals.value
    );
    let range = portion - 250 + "-" + (portion + 250);
    let base = `https://api.edamam.com/search?q={mealType}&app_id=d94c7da3&app_key=1f13399a89f426f18efa99717923245c&to=100&diet=balanced&calories=${range}`;
    this.fetchBreakfast(base, event.target.meals.value);
  };

  // This method is used
  handleEdit = event => {
    this.setState({ cals: event.target.value });
  };
  // change base api to get multiple meals '&to=5' or some shit
  fetchBreakfast(base, count) {
    this.setState({ loading: true });
    let processedData = {};
    let url = base.replace("{mealType}", "Breakfast");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        processedData["breakfast"] = this.postMeals(data.hits);
        this.fetchLunch(base, processedData, count);
      })
      .catch(error => {
        window.alert("Fetch error, Please Try Again!");
      });
  }

  fetchLunch(base, processedData, count) {
    let url = base.replace("{mealType}", "Lunch");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        processedData["lunch"] = this.postMeals(data.hits);
        this.fetchDinner(base, processedData, count);
      })
      .catch(error => {
        this.setState({ loading: false });
        window.alert("Fetch error, Please Try Again!");
      });
  }

  fetchDinner = (base, processedData, count) => {
    let url = base.replace("{mealType}", "Dinner");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        processedData["dinner"] = this.postMeals(data.hits);
        if (parseInt(count) === 4) {
          this.fetchSnack(base, processedData);
        } else {
          firebase
            .database()
            .ref("users/" + this.props.user.displayName)
            .set(processedData);
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        window.alert("Fetch error, Please Try Again!");
        this.setState({ loading: false });
      });
  };
  fetchSnack(base, processedData) {
    let url = base.replace("{mealType}", "Snack");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        processedData["snacks"] = this.postMeals(data.hits);
        firebase
        .database()
        .ref("users/" + this.props.user.displayName)
        .set(processedData);
      this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        window.alert("Fetch error, Please Try Again!");
      });
  }
  // st mifflin jones equation
  formula = event => {
    let height =
      (parseInt(event.target.feet.value) * 12 + parseInt(event.target.inches.value)) * 2.54;
    let reccommended = 10 * (parseFloat(event.target.weight.value) / 2.203) + 6.25 * height - 5 * parseInt(event.target.age.value);
    if (parseInt(event.target.gender.value) === 1) {
      reccommended += 5;
    } else {
      reccommended += -161;
    }
    let tdee = Math.round(
      reccommended * parseFloat(event.target.level.value) * parseFloat(event.target.goals.value)
    );
    this.setState({ cals: tdee });
  };

  // helper method to get necessary json data 
  postMeals(meals) {
    let clean = {};
    for (let i = 0; i < meals.length; i++) {
      clean[i] = {
        name: meals[i].recipe.label,
        image: meals[i].recipe.image,
        calories: Math.round(meals[i].recipe.calories / meals[i].recipe.yield),
        source: meals[i].recipe.url
      };
    }
    return clean;
  }


  render() {
    let showName = this.props.user.displayName;
    if (this.props.user.displayName == null) {
      showName = 'user (your name is not set)';
    }
    return (
      <div>
        <Container>
          <h1>Meal Planner</h1>
        </Container>
        <Container className="text-center">
          <Jumbotron variant="info">
            <h3>Hello, {showName}</h3>
            <p>Don't know how many calories to eat a day?</p>
            <ModalHandler callback={this.handleChange} formula={this.formula} />
          </Jumbotron>
        </Container>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group
              as={Row}
              controlId="formCalories"
              aria-label={"ammount of calories required"}
            >
              <Form.Label column sm="3">
                How much calories?
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="cals"
                  placeholder={"Calories"}
                  value={this.state.cals || ""}
                  onChange={this.handleEdit}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formMeals"
              aria-label={"ammount of meals desired"}
            >
              <Form.Label column sm="3">
                How many meals?
              </Form.Label>
              <Col sm="8">
                <Form.Control name="meals" as="select">
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="pull-right"
                aria-label={"submit to fetch the meals"}
              >
                Generate Meals!
              </Button>
            </Form.Group>
          </Form>
          {this.state.loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only" aria-label="Connecting...">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            <MealList data={this.state.mealData} user={this.props.user} />
          )}
        </Container>
      </div>
    );
  }
}

export default Recipe;
