import dispatcher from "../dispatcher";
import Constants from "../Constants";

import { checkStatus } from "../FetchHelpers";
import { parseString } from "xml2js";

export function updateTrips({ origin, destination, numRoutes=4 }) {
	const url = `https://api.bart.gov/api/sched.aspx?cmd=depart&orig=${origin}&dest=${destination}&date=now&key=MW9S-E7SL-26DU-VV8V&b=0&a=${numRoutes}&l=1`
	const options = {
		method: "GET",
		mode: "cors"
	}

	dispatcher.dispatch({type: Constants.FETCH_TRIPS});

	fetch(url, options)
	.then(checkStatus)
	.then(response => response.text())
	.then((xml) => {
		var r;

		parseString(xml, (err, result) => {
			if(err) { throw new Error(err); }
			r = result
		});

		return r;
	})
	.then((obj) => {
		const trip = obj.root.schedule[0].request[0].trip;
		dispatcher.dispatch({
			type: Constants.RECEIVED_TRIPS,
			trips: (trip ? trip : []),
		});
	})
	.catch((err) => {
		dispatcher.dispatch({
			type: Constants.FETCH_TRIPS_ERROR,
			message: err
		})
		console.error("Failed to fetch advisories! Reason:", err)
	});
}

export function changeOrigin(station) {
	dispatcher.dispatch({
		type: Constants.CHANGE_ORIGIN,
		station
	})
}

export function changeDestination(station) {
	dispatcher.dispatch({
		type: Constants.CHANGE_DESTINATION,
		station
	})
}
