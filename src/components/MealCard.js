import React, { Component } from "react";
import "./meals.css";
import { Card, Button, Dropdown } from "react-bootstrap/";
import firebase from "firebase/app";
class MealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.recipe[0],
      meals: this.props.recipe,
      user: this.props.user,
      type: this.props.type,
      favorites: this.props.faves
    };
  }

  //generate random meal on click
  changeRecipe = event => {
    event.preventDefault();
    let newRec = this.props.recipe[
      Math.floor(Math.random() * this.props.recipe.length)
    ];
    this.setState({ current: newRec });
  };

  // set a meal as your favorite on click 
  setFaves = event => {
    event.preventDefault();
    let meal = {};
    meal[this.state.current.name] = this.state.current;
    let faves = firebase
      .database()
      .ref(
        "users/" + this.state.user.displayName + "/faves/" + this.state.type
      );
    faves.update(meal);
    if (this.state.favorites) {
      let currentFaves = this.state.favorites;
      currentFaves[this.state.current.name] = this.state.current;
      this.setState({ favorites: currentFaves });
    } else {
      this.setState({ favorites: meal });
    }
  };
  // get the favorite meal from the list
  getFav = event => {
    event.preventDefault();
    this.setState({ current: this.state.favorites[event.target.innerHTML] });
  };

  render() {
    let meal = this.state.current;
    let options = <div />;
    if (this.state.favorites) {
      let faves = Object.keys(this.state.favorites).map(meal => {
        let option = (
          <Dropdown.Item key={meal} value={meal}>
            {this.state.favorites[meal].name}
          </Dropdown.Item>
        );
        return option;
      });
      options = (
        <Dropdown onClick={this.getfav}>
          <Dropdown.Toggle variant="success">Favorites</Dropdown.Toggle>
          <Dropdown.Menu onClick={this.getFav}>{faves}</Dropdown.Menu>
        </Dropdown>
      );
    }
    return (
      <Card className="mdl-card" aria-label={"a meal card"}>
        <Card.Header as={"h3"} className="d-flex justify-content-between">
          {this.props.type.charAt(0).toUpperCase() +
            this.props.type.slice(1).toLowerCase()}
          {options}
        </Card.Header>
        <Card.Img className="card-img-top" src={meal.image} alt={meal.name} />
        <Card.Body>
          <Card.Title>{meal.name}</Card.Title>
          <Card.Text>calories: {meal.calories}</Card.Text>
          <Button color="primary" size="sm" href={meal.source} target="_blank">
            Get Recipe
          </Button>{" "}
          <Button
            color="secondary"
            size="sm"
            onClick={this.changeRecipe}
            aria-label={"link to recipe"}
          >
            Change Recipe
          </Button>{" "}
          <Button
            className="btn btn-outline-info"
            size="sm"
            onClick={this.setFaves}
            aria-label={"link to recipe"}
          >
            Favorite
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MealCard;
