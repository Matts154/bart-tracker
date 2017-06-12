import React, { Component } from 'react';

class Route extends Component {
	render() {
		const { origin, destination, origTimeMin, destTimeMin } = this.props.route.$;
		return (
			<tr>
				<td>{origin}</td>
				<td>{destination}</td>
				<td>{origTimeMin}</td>
				<td>{destTimeMin}</td>
			</tr>
		);
	}
}

export default Route;
