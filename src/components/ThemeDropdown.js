import React, { Component } from 'react';

class ThemeDropdown extends Component {
	constructor() {
		super();
		this.state = {
			themes: [
				{
					id: 1,
					name: "Blue",
					url: "./blue.css",
					class: "blue"
				},
				{
					id: 2,
					name: "Dot Matrix",
					url: "./dotmatrix.css",
					class: "dot-matrix"
				},
			]
		}
	}

	render() {
		const themeOptions = this.state.themes.map(theme => {
			const selected = this.props.default.toLowerCase() === theme.class.toLowerCase() ? "selected" : "";
			return <option key={theme.id} value={theme.class} selected={selected}>{theme.name}</option>
		});

		return (
			<select id="theme" {...this.props}>
				{themeOptions}
			</select>
		);

	}
}

export default ThemeDropdown;
