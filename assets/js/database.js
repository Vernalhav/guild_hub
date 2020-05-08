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
		},
		"gyen": {
			name: "gyen",
			description: null,
			imageURL: null,
			sheetURL: null
		}
	},

	'eventos': {
		"o sequestro do anão": {
			name: "o sequestro do anão",
			imageURL: "img/event-img.jpg",
			summary: "Um elfo atravessando uma fria floresta não esperava encontrar um anão preso em sua carruagem quebrada",
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eos quam aut non molestias dignissimos possimus. Quos dolorem enim quasi incidunt ipsa ad a sit placeat. Exercitationem velit et eius dolor consectetur molestiae modi ipsam placeat, iste cupiditate, possimus accusamus, rem ea cum reiciendis? Illum, id ipsa? Dignissimos accusamus, ducimus iusto non fuga officia similique itaque? Maxime, similique dolores molestias quod in quos id, fugiat voluptate recusandae saepe iure ipsa, minima asperiores reprehenderit illo magni neque atque. Libero fugiat quos tempora eum atque explicabo, alias dolor et necessitatibus similique, doloremque neque maxime soluta nostrum iure est assumenda temporibus ut aut laboriosam. Debitis, numquam voluptate repellendus tenetur explicabo vitae ducimus autem cum! Tenetur expedita ab officia a blanditiis ex consequatur excepturi molestiae? Harum commodi delectus optio hic magnam, quos animi. Tempora, consequatur nostrum architecto ab nemo asperiores ratione nisi odio eum ad? Earum possimus eveniet doloribus magnam ab repellat at. Asperiores atque ut cupiditate, dolorem consequuntur tempore odit fugit itaque beatae optio porro mollitia et nemo eius nobis, incidunt velit recusandae quas reiciendis nostrum magnam qui temporibus. Qui fuga fugiat rem maiores inventore at assumenda voluptatibus enim, eveniet dolore incidunt, nisi nemo labore ratione expedita explicabo, soluta consequuntur cupiditate facere ipsam!"
		},
		"os primeiros membros": {
			name: "os primeiros membros",
			imageURL: null,
			summary: "Numa noite fria ao pé das montanhas de Kahsemir, o Bar do Brás recebia mais visitantes do que o normal. Essas pessoas logo se tornariam membros da Guilda das Lendas",
			description: null
		}
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

	'others': {
		'itens': {
			"relógio misterioso": {
				name: "relógio misterioso",
				description: null,
				imageURL: null
			},
			"dardo envenenado": {
				name: "dardo envenenado",
				description: null,
				imageURL: null
			}
		},

		'divindades': {
			"mixolydia": {
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
	when table is not valid, passing an empty aray
*/
export async function selectAll(table, callback){
	
	let entities = [];
	table = table.toLowerCase();

	if (standardLoreTypes.includes(table)){
		for (let entity in database[table])
			entities.push(database[table][entity]);

	} else if (otherLoreTypes.includes(table)){
		for (let entity in database['others'][table]){
			entities.push(database['others'][table][entity]);
		}
	}
	callback(entities);
}