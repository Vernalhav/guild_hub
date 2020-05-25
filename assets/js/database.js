"use strict";

import {standardLoreTypes, otherLoreTypes} from "./config.js";

/*
	This is merely a simulation of our database. The hope
	is that we can define a complete API in this file and
	only change it when we implement the actual DB, without
	having to change any other files.
*/


// TODO: decide how to model references!
const sample_database = {
	'personagens': {
		"escriba": {
			type: "personagens",
			name: "escriba",
			description: "Um dos primeiros membros da guilda, fiel amigo do Pintassilgo.",
			imageURL: "https://vignette.wikia.nocookie.net/gwent/images/3/35/Sage.gif/revision/latest?cb=20180802112253",
			sheetURL: null
		},
		"mãe": {
			type: "personagens",
			name: "mãe",
			description: null,
			imageURL: "https://www.vgr.com/wp-content/uploads/2018/10/Brouver-Hoog-is-Making-his-First-In-Game-Appearance-in-Thronebreaker-924x520.jpg",
			sheetURL: null
		},
		"sandy": {
			type: "personagens",
			name: "sandy",
			description: null,
			imageURL: null,
			sheetURL: null
		},
		"tocha": {
			type: "personagens",
			name: "tocha",
			description: null,
			imageURL: null,
			sheetURL: null
		},
		"ajuda": {
			type: "personagens",
			name: "ajuda",
			description: null,
			imageURL: null,
			sheetURL: null
		},
		"gyen": {
			type: "personagens",
			name: "gyen",
			description: null,
			imageURL: null,
			sheetURL: null
		}
	},

	'eventos': {
		"o sequestro do anão": {
			type: "eventos",
			name: "o sequestro do anão",
			location: null,
			imageURL: "img/event-img.jpg",
			summary: "Um elfo atravessando uma fria floresta não esperava encontrar um anão preso em sua carruagem quebrada",
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eos quam aut non molestias dignissimos possimus. Quos dolorem enim quasi incidunt ipsa ad a sit placeat. Exercitationem velit et eius dolor consectetur molestiae modi ipsam placeat, iste cupiditate, possimus accusamus, rem ea cum reiciendis? Illum, id ipsa? Dignissimos accusamus, ducimus iusto non fuga officia similique itaque? Maxime, similique dolores molestias quod in quos id, fugiat voluptate recusandae saepe iure ipsa, minima asperiores reprehenderit illo magni neque atque. Libero fugiat quos tempora eum atque explicabo, alias dolor et necessitatibus similique, doloremque neque maxime soluta nostrum iure est assumenda temporibus ut aut laboriosam. Debitis, numquam voluptate repellendus tenetur explicabo vitae ducimus autem cum! Tenetur expedita ab officia a blanditiis ex consequatur excepturi molestiae? Harum commodi delectus optio hic magnam, quos animi. Tempora, consequatur nostrum architecto ab nemo asperiores ratione nisi odio eum ad? Earum possimus eveniet doloribus magnam ab repellat at. Asperiores atque ut cupiditate, dolorem consequuntur tempore odit fugit itaque beatae optio porro mollitia et nemo eius nobis, incidunt velit recusandae quas reiciendis nostrum magnam qui temporibus. Qui fuga fugiat rem maiores inventore at assumenda voluptatibus enim, eveniet dolore incidunt, nisi nemo labore ratione expedita explicabo, soluta consequuntur cupiditate facere ipsam!",
			date: {
				period: "dE",
				year: 1957,
				week: 27,
				order: 0
			},
			timelines: ["Guilda", "Personagens"]
		},
		"os primeiros membros": {
			type: "eventos",
			name: "os primeiros membros",
			location: "guilda das lendas",
			imageURL: null,
			summary: "Numa noite fria ao pé das montanhas de Kahsemir, o Bar do Brás recebia mais visitantes do que o normal. Essas pessoas logo se tornariam membros da Guilda das Lendas",
			description: null,
			date: {
				period: "aE",
				year: 1959,
				week: 35,
				order: 0
			},
			timelines: ["Guilda"]
		},
		"o mistério da clave de fá": {
			type: "eventos",
			name: "o mistério da clave de fá",
			location: "rindell",
			imageURL: null,
			summary: "Qual é a do Marcus, velho?",
			description: "Ele tava fazendo umas fita",
			date: {
				period: "dE",
				year: 1955,
				week: 13,
				order: 0
			},
			timelines: ["Mundo"]
		},
	},

	'locais': {
		"rindell": {
			type: "locais",
			name: "rindell",
			description: null,
			imageURL: null,
			coordinates: [1651.1774182321617, 511.2467358519786],
			battleMapURL: null
		},
		"guilda das lendas": {
			type: "locais",
			name: "guilda das lendas",
			description: null,
			imageURL: null,
			coordinates: [1892.7302384311672, 1043.2918550676998],
			battleMapURL: null
		}
	},

	'others': {
		'itens': {
			"relógio misterioso": {
				type: "itens",
				name: "relógio misterioso",
				description: null,
				imageURL: null
			},
			"dardo envenenado": {
				type: "itens",
				name: "dardo envenenado",
				description: null,
				imageURL: null
			}
		},

		'divindades': {
			"mixolydia": {
				type: "divindades",
				name: "mixolydia",
				description: null,
				imageURL: null
			}
		}
	}
};

/*
	This function puts all elements in the
	database table into an array and calls
	the callback function with the array as
	a parameter asynchronously.

	'table' must be either in standardLoreTypes
	or in otherLoreTypes. Callback is called even
	when 'table' is not valid, passing an empty array
*/
export async function selectAll(table, callback) {
	
	let entities = [];
	table = table.toLowerCase();

	let loreTable;
	if (standardLoreTypes.includes(table)){
		loreTable = JSON.parse(localStorage.getItem(table));
		for (let entity in loreTable)
			entities.push(loreTable[entity]);
	}
	else if (otherLoreTypes.includes(table)){
		loreTable = JSON.parse(localStorage.getItem('others'));

		for (let entity in loreTable[table]){
			entities.push(loreTable[table][entity]);
		}
	}

	callback(entities);
}


/*
	This function finds a single lore entry whose
	primary key is in table. Calls the callback
	function with the lore object if found, or null.

	'table' must be either in standardLoreTypes
	or in otherLoreTypes. Callback is called even
	when 'table' is not valid, passing null.
*/
export async function selectSingle(table, primaryKey, callback) {

	let lore = null;
	table = table.toLowerCase();
	primaryKey = primaryKey.toLowerCase();

	let loreTable;
	if (standardLoreTypes.includes(table)){
		loreTable = JSON.parse(localStorage.getItem(table));
		lore = loreTable[primaryKey];
	}
	else if (otherLoreTypes.includes(table)){
		loreTable = JSON.parse(localStorage.getItem('others'));
		lore = loreTable[table][primaryKey];
	}

	callback(lore || null);
}

 
/*
	This function adds a single lore object
	to the database. Lore must have at least
	a type and a UNIQUE name among its type
	(case insensitive). The lore type must
	be in either standard or other lore type
	arrays.

	If the name is not unique, this function
	overwrites the previous content with the
	current lore object.

	Callback is called passing the inserted
	lore object as parameter, or null if it
	is invalid.
*/
export async function insert(lore, callback) {

	if (lore.name == null || lore.type == null){
		callback(null);
		return;
	}

	lore.name = lore.name.toLowerCase();
	lore.type = lore.type.toLowerCase();
	let loreTable;

	if (standardLoreTypes.includes(lore.type)){
		loreTable = JSON.parse(localStorage.getItem(lore.type));
		loreTable[lore.name] = lore;
		localStorage.setItem(lore.type, JSON.stringify(loreTable));
	}
	else if (otherLoreTypes.includes(lore.type)){
		loreTable = JSON.parse(localStorage.getItem('others'));

		if (loreTable[lore.type] == undefined){
			loreTable[lore.type] = {};
		}
		loreTable[lore.type][lore.name] = lore;
		localStorage.setItem('others', JSON.stringify(loreTable));
	}
	else {
		callback(null);
		return;
	}

	callback(lore);
}


export async function setupDatabase(callback) {
	if (localStorage.length == 0) populateDatabase();
	if (callback) callback();
}


/*
	This function stores the sample_database
	object in the user's localStorage.
*/
function populateDatabase() {
	standardLoreTypes.forEach(loreType=>{
		localStorage.setItem(loreType, JSON.stringify(sample_database[loreType]));
	});
	localStorage.setItem('others', JSON.stringify(sample_database['others']));
}