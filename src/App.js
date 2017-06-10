import React, { Component } from 'react';
import Slideout from "slideout";
import { transform } from "lodash";

import './App.css';
import './dotmatrix.css';
import './blue.css';

import AdvisoryStore from "./store/AdvisoryStore";
import { updateAdvisories } from "./actions/AdvisoryActions";

import TripStore from "./store/TripStore";
import { updateTrips } from "./actions/TripActions";
import Constants from "./Constants"

import BARTAbbreviations from "./BARTAbbreviations";

class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: "dot-matrix",
            origin: "PITT",
            destination: "EMBR",
            advisories: [],
            trips: [],
            timeout: 5,
            numRoutes: 4,
        }
    }

    componentWillMount() {
        // Listen to advisory update events.
        AdvisoryStore.on(Constants.UPDATED_ADVISORIES, this.getAdvisories.bind(this));

        // Listen to trip updates
        TripStore.on(Constants.UPDATED_TRIPS, this.getTripInformation.bind(this))

        // Update stuff at a regular interval.
        this.interval = setInterval(this.refreshData.bind(this), 5000);
    }

    componentDidMount() {
        this.refreshData();

        this.slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
        })
    }

    componentWillUnmount() {
        AdvisoryStore.unbindListener(Constants.UPDATED_ADVISORIES, this.getAdvisories.bind(this))
        TripStore.unbindListener(Constants.UPDATED_TRIPS, this.getTripInformation.bind(this))
    }

    getAdvisories() {
        this.setState(Object.assign({}, this.state, {advisories: AdvisoryStore.getAll()}));
    }

    getTripInformation() {
        this.setState(Object.assign({}, this.state, {trips: TripStore.getAll()}));
    }

    slideoutToggle() {
        this.slideout.toggle();
    }

    refreshData() {
        updateAdvisories();
        updateTrips(this.state);
    }

    handleOptionChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        let newState = {};

        newState[event.target.id] = event.target.value;

        if (key === "timeout") {
            clearInterval(this.interval);
            this.interval = setInterval(this.refreshData.bind(this), value * 1000);
        }

        this.setState(Object.assign({}, this.state, newState));
    }

    render() {
        const advisories = this.state.advisories.map((advisory, index) => {
            return (
                <tr key={`advisory${index}`}>
                    <td>{advisory.description}</td>
                </tr>
            );
        });

        const trips = this.state.trips.map((trip, index) => {
            return (
                <tr key={`trip#${index}`}>
                    <td>{trip.$.origin}</td>
                    <td>{trip.$.destination}</td>
                    <td>{trip.$.origTimeMin}</td>
                    <td>{trip.$.destTimeMin}</td>
                </tr>
            );
        });

        const bartStations = transform(BARTAbbreviations, (result, name, abbreviation) => {
            result.push (
                <option key={abbreviation} value={abbreviation}>{name}</option>
            );
        }, []);

            // return (
            //     <li key={index}>
            //         <p><strong>ID</strong>: {advisory.$.id}
            //         <br />
            //         <strong>Type</strong>: {advisory.type}
            //         <br />
            //         <strong>Description</strong>: {advisory.description}
            //         <br />
            //         <br />
            //         Posted: {advisory.posted}
            //         <br />
            //         Expires: {advisory.expires}</p>
            //     </li>
            // );
        return (
            <div className="container">
                <nav id="menu">
                    <form onChange={this.handleOptionChange.bind(this)} className="options-menu">
                        <h2>Options</h2>
                        <p>Theme</p>
                        <select id="theme" selected={this.state.theme}>
                            <option value="dot-matrix">Dot matrix</option>
                            <option value="blue">Blue</option>
                        </select>
                        <p>Origin</p>
                        <select id="origin" selected={this.state.origin}>
                            {bartStations}
                        </select>
                        <p>Destination</p>
                        <select id="destination" selected={this.state.destination}>
                            {bartStations}
                        </select>
                        <p>Num Routes (0-4):</p>
                        <input id="numRoutes" type="text" value={this.state.numRoutes}/>
                        <p>Timeout (in seconds)</p>
                        <input id="timeout" type="text" value={this.state.timeout}/>
                    </form>
                </nav>

                <main id="panel" className={this.state.theme}>
                    <header>
                        <button className="toggle-button" onClick={this.slideoutToggle.bind(this)}><i className="fa fa-cog fa-2x"></i></button>
                        <h1><span className="oswald bold">BART</span><span className="oswald light">tracker</span></h1>
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <td>FROM</td>
                                <td>TO</td>
                                <td>DEPARTURE</td>
                                <td>ARRIVAL</td>
                            </tr>
                        </thead>
                        <tbody>
                            {trips}
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            {advisories}
                        </tbody>
                    </table>
                </main>
            </div>
            );
        }
    }

export default App;
