import React, { Component } from 'react';


import ThemeDropdown from "./ThemeDropdown";
import BARTStationDropdown from "./BARTStationDropdown";

class OptionsPanel extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<nav id="menu">
				<form onChange={this.props.handleOptionChange} className="options-menu">
					<h2>Options</h2>

					<p>Theme</p>
					<ThemeDropdown id="theme" default={this.props.theme} />

					<p>Origin</p>
					<BARTStationDropdown id="origin" default={this.props.origin} />

					<p>Destination</p>
					<BARTStationDropdown id="destination" default={this.props.destination} />

					<p>Num Routes (0-4):</p>
					<input id="numRoutes" type="text" value={this.props.numRoutes}/>

					<p>Timeout (in seconds)</p>
					<input id="timeout" type="text" value={this.props.timeout}/>
				</form>
			</nav>
		);
	}
}

export default OptionsPanel;
