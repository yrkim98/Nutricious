import React, { Component } from "react";
import Script from "react-load-script";
import { Button, Form, Input } from "reactstrap";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      address: ""
    };
  }
  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    let options = {
      types: ["address"]
    }; // To disable any eslint 'google not defined' errors
    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // Checks if address is valid
    if (address) {
      // Set State
      this.setState({
        city: address[0].long_name,
        address: addressObject.formatted_address
      });
      console.log("google suggest");
      this.props.search(addressObject.formatted_address);
    }
  };
  //Updates the state when address is typed
  handleChange = event => {
    let addressValue = event.target.value;
    event.preventDefault();
    this.setState({
      address: addressValue,
      reps: this.state.reps,
      offices: this.state.offices
    });
  };
  // check for key presses
  handleKeyPress = target => {
    if (target.charCode === 13) {
      this.handleClick();
    }
  };
  // check for clicks
  handleClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.search(this.state.address);
  };
  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2dqqM_vFbnSMv71Yfmyns3lqPS9p3DrA&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Form role="search">
          <Input
            id="autocomplete"
            aria-label="Search"
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
          <Button
            variant="outline-success"
            type="submit"
            color="primary"
            onClick={this.handleClick}
          >
            Find
          </Button>
        </Form>
      </div>
    );
  }
}
export default Search;
