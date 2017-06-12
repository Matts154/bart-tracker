import React, { Component } from 'react';
import BARTStations from "../BARTStations";

class BARTStationDropdown extends Component {
	render() {
		const stationOptions = BARTStations.map(station => {
			const selected = this.props.default.toLowerCase() === station.abbreviation.toLowerCase() ? "selected" : "";
			return <option key={station.abbreviation} value={station.abbreviation} selected={selected}>{station.name}</option>
		});

		return (
			<select id={this.props.id} {...this.props}>
				{stationOptions}
			</select>
		);

	}
}

export default BARTStationDropdown;
