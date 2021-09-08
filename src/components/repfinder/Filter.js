import React, { Component } from "react";
import { InputGroupAddon, Input, Row, Col, InputGroupText } from "reactstrap";
// const federalPattern = "ocd-division/country:us";
// const statePattern = /ocd-division\/country:us\/state:(\D{2}$)/;
// const cdPattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
// const countyPattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
// const localPattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;

class Filter extends Component {
  // gets the checkbox value of appropriate filters that user wants to implement
  retrieveLocal = event => {
    this.props.setDisplay("local", !this.props.display.local);
  };
  retrieveState = event => {
    this.props.setDisplay("state", !this.props.display.state);
  };
  retrieveCounty = event => {
    this.props.setDisplay("county", !this.props.display.county);
  };
  retrieveFederal = event => {
    this.props.setDisplay("federal", !this.props.display.federal);
  };
  // render the filter options as input radio buttons
  render() {
    return (
      <div>
        <Row>
          <Col>
            <InputGroupAddon addonType="append">
              <InputGroupAddon addonType="append">Local</InputGroupAddon>
              <InputGroupText>
                <Input
                  role="button"
                  aria-pressed="false"
                  addon
                  onClick={this.retrieveLocal}
                  type="checkbox"
                  aria-label="Local Checkbox"
                />
              </InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col>
            <InputGroupAddon addonType="append">
              <InputGroupAddon addonType="append">County</InputGroupAddon>
              <InputGroupText>
                <Input
                  role="button"
                  aria-pressed="false"
                  addon
                  onClick={this.retrieveCounty}
                  type="checkbox"
                  aria-label="Local Checkbox"
                />
              </InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col>
            <InputGroupAddon addonType="append">
              <InputGroupAddon addonType="append">State</InputGroupAddon>
              <InputGroupText>
                <Input
                  role="button"
                  aria-pressed="false"
                  addon
                  onClick={this.retrieveState}
                  type="checkbox"
                  aria-label="State Checkbox"
                />
              </InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col>
            <InputGroupAddon addonType="append">
              <InputGroupAddon addonType="append">Federal</InputGroupAddon>
              <InputGroupText>
                <Input
                  role="button"
                  aria-pressed="false"
                  addon
                  onClick={this.retrieveFederal}
                  type="checkbox"
                  aria-label="Federal Checkbox"
                />
              </InputGroupText>
            </InputGroupAddon>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Filter;
