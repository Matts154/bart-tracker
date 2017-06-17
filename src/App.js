import React, { Component } from 'react';
import Slideout from "slideout";

import MainPanel from "./components/MainPanel";
import OptionsPanel from "./components/OptionsPanel";

import AdvisoryStore from "./store/AdvisoryStore";
import { updateAdvisories } from "./actions/AdvisoryActions";

import TripStore from "./store/TripStore";
import { updateTrips } from "./actions/TripActions";
import Constants from "./Constants"

import './App.css';
import './dotmatrix.css';
import './blue.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: "dot-matrix",
            origin: "PITT",
            destination: "EMBR",
            timeout: 5,
            numRoutes: 4,
            routes: [],
            advisories: [],
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
            }
        );
    }

	componentWillUnmount() {
		AdvisoryStore.unbindListener(Constants.UPDATED_ADVISORIES, this.getAdvisories.bind(this))
		TripStore.unbindListener(Constants.UPDATED_TRIPS, this.getTripInformation.bind(this))
		clearInterval(this.interval);
	}

	getAdvisories() {
		this.setState(Object.assign({}, this.state, {advisories: AdvisoryStore.getAll()}));
	}

	getTripInformation() {
		this.setState(Object.assign({}, this.state, {routes: TripStore.getAll()}));
	}

	refreshData() {
		updateAdvisories();
		updateTrips(this.state);
	}

	slideoutToggle() {
		this.slideout.toggle();
	}

    handleOptionChange(event) {
        const key = event.target.id;
        const value = event.target.value;

        if (key === "timeout") {
            clearInterval(this.interval);
            this.interval = setInterval(this.refreshData.bind(this), value * 1000);
        }

        this.setState(Object.assign({}, this.state, {[key]: value}));
    }

    render() {
        return (
            <div className="container">
                <OptionsPanel handleOptionChange={this.handleOptionChange.bind(this)} {...this.state} />
                <MainPanel slideoutToggle={this.slideoutToggle.bind(this)} {...this.state} />
            </div>
            );
        }
    }

export default App;
