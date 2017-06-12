import React, { Component } from 'react';

class Advisory extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.advisory.description}</td>
			</tr>
		);
	}
}

export default Advisory;
