import React, { Component } from "react";
import axios from "axios";
import RenderTable from "./RenderTable";
import Search from "./Search";
import Filter from "./Filter";
import { Container } from "react-bootstrap";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: { local: false, county: false, state: false, federal: false },
      division: [],
      offices: [],
      reps: []
    };
  }
  // changes display on toggle realtime data
  setDisplay = (display, toggle) => {
    this.setState(function(prevState) {
      prevState.display[display] = toggle;
      return prevState;
    });
  };
  //Gets data from google civics API via axios request
  search = address => {
    let electionId = 2000;
    axios
      .get("https://www.googleapis.com/civicinfo/v2/representatives", {
        params: {
          key: "AIzaSyBsP_HExLE7-6QINDS-5gGHNFyno8FW9F8",
          electionId: electionId,
          address: address
        }
      })
      .then(json => {
        this.setState({
          address: address,
          division: json["data"]["divisions"],
          officialsTable: json["data"]["officials"],
          offices: json["data"]["offices"]
        });
      });
  };
  // retrieve certain data if radio buttons are selected for realtime data, then we map it
  retrieveAll = (levels) => {
    let officials = this.state["officialsTable"];
    return this.state.offices
      .filter(rows => {
        let i = this.state.offices.indexOf(rows);
        return (
          typeof rows != undefined &&
          this.state.offices[i]["divisionId"].match(levels)
        );
      })
      .map(offices => {
        let image;
        let j = 0;
        let getName = "Unavailable";
        j = this.state.offices.indexOf(offices);
        getName = offices["name"];
        let officialsData = officials[j];
        let candidate = officialsData["name"];
        let urls = officialsData["urls"];
        image = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
        let isUndefined;
        if ("urls" in officialsData) {
          isUndefined = urls[0];
        } else {
          isUndefined = "Not Available";
        }
        if ("photoUrl" in officialsData) {
          image = officialsData["photoUrl"];
        }
        return (
          <tr aria-live="polite" key={this.state.offices.uniqueId}>
            <td  aria-live="polite" key={image.uniqueId}>
              <a href={image}>
                {
                  <img
                    width={"120px"}
                    height={"150px"}
                    src={image}
                    alt="Representative"
                  />
                }
              </a>
            </td>
            <td aria-live="polite" key={candidate.uniqueId}>
              {candidate}
            </td>
            <td aria-live="polite" key={getName.uniqueId}>
              {getName}
            </td>
            <td aria-live="polite">
              {officialsData["party"]}
            </td>
            <td aria-live="polite" key={isUndefined.uniqueId}>
              {<a href={isUndefined}>{isUndefined}</a>}
            </td>
            <td >{officialsData["phones"]}</td>
          </tr>
        );
      });
  }

  render() {
    let repsList;
    let smallerList;
    // initailized constants to help with fetch 
    let federalPattern = "ocd-division/country:us";
    let statePattern = /ocd-division\/country:us\/state:(\D{2}$)/;
    let cdPattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
    let countyPattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
    let localPattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;
    if (this.state.display.local) {
      repsList = this.retrieveAll(localPattern);
    }
    if (this.state.display.county) {
      repsList = this.retrieveAll(countyPattern);
    }
    if (this.state.display.state) {
      repsList = this.retrieveAll(statePattern);
      smallerList = this.retrieveAll(cdPattern);
    }
    if (this.state.display.federal) {
      repsList = this.retrieveAll(federalPattern);
    }
    if (
      !this.state.display.local &&
      !this.state.display.state &&
      !this.state.display.county &&
      !this.state.display.federal
    ) {
      repsList = this.retrieveAll("");
    }
    return (
      <div>
        <Container>
          <h1 style={{ fontStyle: "oblique", fontSize: 24, color: "gray" }}>
            Enter Full Address, Zip, or City
          </h1>
          <div>
            <Search search={this.search} />
          </div>
          <Container>
            <div>
              <Container>
                <h1
                  style={{ fontStyle: "oblique", color: "gray", fontSize: 24 }}
                >
                  Choose level(s) of Government:{" "}
                </h1>
              </Container>
              <Container>
                <Filter
                  setDisplay={this.setDisplay}
                  display={this.state.display}
                />
              </Container>
            </div>
          </Container>
        </Container>
        <Container>
          <RenderTable key={"table"} smallerList={smallerList} repsList={repsList} />
        </Container>
      </div>
    );
  }
}
export default Tables;
