import React, { Component } from 'react';
import Route from "./Route";

class RouteTable extends Component {
	render() {
		const routes = this.props.routes.map((route, index) => {
			return (
				<Route key={`route#${index}`} id={`route#${index}`} route={route} />
			);
		})

		return (
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
					{routes}
				</tbody>
			</table>
		);

	}
}

export default RouteTable;
