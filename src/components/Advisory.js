import React, { Component } from 'react';

class Advisory extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.advisory.description !== this.props.advisory.description;
	}

	render() {
		return (
			<tr>
				<td>{this.props.advisory.description}</td>
			</tr>
		);
	}
}

export default Advisory;
