import React, { Component } from 'react';
import Advisory from "./Advisory";

class AdvisoryTable extends Component {
	render() {
		const advisories = this.props.advisories.map((advisory, index) => {
			return (
				<Advisory key={`advisory#${index}`} advisory={advisory} />
			);
		})

		return (
			<table>
				<tbody>
					{advisories}
				</tbody>
			</table>
		);

	}
}

export default AdvisoryTable;
