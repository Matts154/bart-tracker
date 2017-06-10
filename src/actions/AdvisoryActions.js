import { parseString } from "xml2js";

import Constants from "../Constants";
import dispatcher from "../dispatcher";
import { checkStatus } from "../FetchHelpers";

export function updateAdvisories() {
	const url = "https://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&date=today"
	const options = {
		method: "GET",
		mode: "cors"
	}

	dispatcher.dispatch({type: Constants.FETCH_ADVISORIES});

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
		dispatcher.dispatch({
			type: Constants.RECEIVED_ADVISORIES,
			advisories: obj.root.bsa
		});
	})
	.catch((err) => {
		dispatcher.dispatch({
			type: Constants.FETCH_ADVISORIES_ERROR,
			message: err
		})
		console.error("Failed to fetch advisories! Reason:", err)
	});
}
