import {standardLoreTypes, otherLoreTypes} from "./config.js";

/*
	This is merely a simulation of our database. The hope
	is that we can define a complete API in this file and
	only change it when we implement the actual DB, without
	having to change any other files.
*/

// TODO: decide how to model references!
let database = {
	'personagens': {
		"mãe": {
			name: "mãe",
			description: null,
			imageURL: "https://www.vgr.com/wp-content/uploads/2018/10/Brouver-Hoog-is-Making-his-First-In-Game-Appearance-in-Thronebreaker-924x520.jpg",
			sheetURL: null
		},
		"sandy": {
			name: "sandy",
			description: null,
			imageURL: null,
			sheetURL: null
		},
		"tocha": {
			name: "tocha",
			description: null,
			imageURL: null,
			sheetURL: null
		},
		"ajuda": {
			name: "ajuda",
			description: null,
			imageURL: null,
			sheetURL: null
		}
	},

	'eventos': {

	},

	'locais': {
		"rindell": {
			name: "rindell",
			description: null,
			imageURL: null,
			coordinates: null,
			battleMapURL: null
		},
		"guilda das lendas": {
			name: "guilda das lendas",
			description: null,
			imageURL: null,
			coordinates: null,
			battleMapURL: null
		}
	},

	'outros': {
		"relógio misterioso": {
			type: "item",		// Type must belong to otherLoreTypes array
			name: "relógio misterioso",
			description: null,
			imageURL: null
		},
		"mixolydia": {
			type: "divindade",
			name: "mixolydia",
			description: null,
			imageURL: null
		}
	}
};

/*
	This function puts all elements in the
	database table into an array and calls
	the callback function with the array as
	a parameter asynchronously.
*/
export async function selectAll(table, callback){
	let entities = [];
	table = table.toLowerCase();

	for (let entity in database[table]) entities.push(database[table][entity]);
	
	callback(entities);
}