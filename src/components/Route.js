import React, { Component } from 'react';

class Route extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.route.$.origin !== this.props.route.$.origin ||
			   nextProps.route.$.destination !== this.props.route.$.destination ||
			   nextProps.route.$.origTimeMin !== this.props.route.$.origTimeMin ||
			   nextProps.route.$.destTimeMin !== this.props.route.$.destTimeMin;
	}

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
