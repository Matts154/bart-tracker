import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


import Constants from "../Constants";


class AdvisoryStore extends EventEmitter {
	constructor() {
		super();
		this.advisories = [];
		// 	{
		// 		id: 112978,
		// 		station: "BART",
		// 		type: "DELAY",
		// 		description: "BART is running round-the-clock service during the labor day weekend bay bridge closure. More info at www.bart.gov or (510) 465-2278.",
		// 		posted: "Wed Aug 28 2013 10:44 PM PDT",
		// 		expires: "Thu Dec 31 2037 11:59 PM PST"
		// 	},
		// 	{
		// 		id: 152974,
		// 		station: "BART",
		// 		type: "DELAY",
		// 		description: "RIDER ALERT! No trains will run between Fruitvale and Lake Merritt stations on Memorial Day weekend, May 27th, 28th, & 29th. Lake Merritt Station will be closed. Free bus bridge. 20-40 min delays - especially to Oakl Airport. Go to bart.gov for bus map.",
		// 		posted: "Sun May 28 2017 08:13 AM PDT",
		// 		expires: "Thu Dec 31 2037 11:59 PM PST"
		// 	}
		// ];
	}

	getAll() {
		return this.advisories;
	}

	updateAdvisories(advisories) {
		this.advisories = advisories;
		this.emit(Constants.UPDATED_ADVISORIES)
	}

	handleAction(action) {
		switch(action.type) {
			case Constants.RECEIVED_ADVISORIES:
				this.updateAdvisories(action.advisories);
				break;
			default:
				break;
		}
	}
}

const advisoryStore = new AdvisoryStore();
dispatcher.register(advisoryStore.handleAction.bind(advisoryStore));
export default advisoryStore;
