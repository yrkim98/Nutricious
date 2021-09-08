import React, { Component } from 'react';
import axios from 'axios';
import RenderTable from './RenderTable';
import Search from './Search';
import Filter from './Filter';


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
    setDisplay = (display, toggle) => {
        this.setState(function (prevState) {
            prevState.display[display] = toggle;
            return prevState;
        });
    }
    //Gets data from google civics API via axios request
    search = (address) => {
        console.log("search", address);
        var electionId = 2000;
        axios.get('https://www.googleapis.com/civicinfo/v2/representatives', {
            'params':
            {
                'key': 'AIzaSyBsP_HExLE7-6QINDS-5gGHNFyno8FW9F8',
                'electionId': electionId,
                'address': address
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
    }
    retrieveAll(levels) {
        var officials = this.state["officialsTable"];
        return this.state.offices.filter(rows => {
            var i = this.state.offices.indexOf(rows);
            return (typeof rows != undefined && this.state.offices[i]["divisionId"].match(levels))
        }
        ).map(
            offices => {
                var image;
                var j = 0;
                var getName = "Unavailable";
                j = this.state.offices.indexOf(offices);
                getName = offices['name'];
                var officialsData = officials[j];
                var candidate = officialsData['name'];
                var urls = officialsData['urls'];
                image = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
                var isUndefined;
                if ('urls' in officialsData) {
                    isUndefined = urls[0];
                } else {
                    isUndefined = "Not Available"
                }
                if ('photoUrl' in officialsData) {
                    image = officialsData['photoUrl'];
                }
                return (
                    <tr aria-live="polite" key={this.state.offices.uniqueId}>
                        <td scope="col" aria-live="polite" key={image.uniqueId} ><a href={image}>{<img width={'120px'} height={'150px'} src={image} alt="Representative" />}</a></td>
                        <td scope="col" aria-live="polite" key={candidate.uniqueId} >{candidate}</td>
                        <td scope="col" aria-live="polite" key={getName.uniqueId} >{getName}</td>
                        <td scope="col" aria-live="polite" >{officialsData["party"]}</td>
                        <td scope="col" aria-live="polite" key={isUndefined.uniqueId}>{<a href={isUndefined}>{isUndefined}</a>}</td>
                        <td scope="col">{officialsData["phones"]}</td>
                    </tr>
                );
            }
        );
    }
    render() {
        var repsList;
        var smallerList;
        var federalPattern = "ocd-division/country:us";
        var statePattern = /ocd-division\/country:us\/state:(\D{2}$)/;
        var cdPattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
        var countyPattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
        var localPattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;
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
        if (!this.state.display.local && !this.state.display.state && !this.state.display.county && !this.state.display.federal) {
            repsList = this.retrieveAll("");
        }
        return (
            <div className="mx-4">
                <br />
                <br />
                <h1 style={{ fontStyle: "oblique", fontSize: 24, color: "gray" }}>Enter Full Address, Zip, or City</h1>
                <div>
                    <Search search={this.search.bind(this)} />
                </div>
                <br />
                <div>
                    <div>
                        <h1 style={{ fontStyle: "oblique", color: "gray", fontSize: 24 }}>Choose level(s) of Government: </h1>
                        <br />
                        <Filter setDisplay={this.setDisplay.bind(this)} display={this.state.display} />
                    </div>
                </div>
                <br />
                <br />
                <RenderTable smallerList={smallerList} repsList={repsList} />
            </div>
        );
    }
}
export default Tables;