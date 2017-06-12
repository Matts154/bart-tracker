import React, { Component } from 'react';

import RouteTable from "./RouteTable";
import AdvisoryTable from "./AdvisoryTable";

class MainPanel extends Component {
	render() {
		return (
			<main id="panel" className={this.props.theme}>
				<header>
					<button className="toggle-button" onClick={this.props.slideoutToggle}><i className="fa fa-cog fa-2x"></i></button>
					<h1><span className="oswald bold">BART</span><span className="oswald light">tracker</span></h1>
				</header>

				<RouteTable routes={this.props.routes} />

				<AdvisoryTable advisories={this.props.advisories} />
			</main>
		);
	}
}
export default MainPanel;
