import {insert} from './database.js';
import {getFormLocation} from './map.js';


// TODO: ADD FORM VALIDATION AND FEEDBACK!
// TODO: MODEL AND IMPLEMENT REFERENCES

export async function submitEvent(e) {
	e.preventDefault();

	// TODO: DECIDE HOW TO MODEL DATES (aE/dE?)
	// TODO: FORM VALIDATION!

	let lore = {
		type: "eventos",
		name: $("#event-name").val() || null,
		location: $("#event-location").val() || null,
		date: null,
		summary: $("#event-summary").val() || null,
		description: $("#event-description").val() || null,
		imageURL: $("#event-image").val() || null
	};


	insert(lore, loreObject=>{
		if (loreObject){
			// Success toast message
			$("#add-event-form").trigger("reset");
		} else {
			// Failure toast message
		}
	});
}


export async function submitLocation(e) {
	e.preventDefault();

	let lore = {
		type: "locais",
		name: $("#location-name").val() || null,
		coordinates: getFormLocation() || null,
		description: $("#location-description").val() || null,
		imageURL: $("#location-image").val() || null,
		battlemapURL: $("#location-battlemap").val() || null
	};

	insert(lore, loreObject=>{
		if (loreObject){
			// Success toast message
			$("#add-location-form").trigger("reset");
		} else {
			// Failure toast message
		}
	});
}


export async function submitCharacter(e) {
	e.preventDefault();

	let lore = {
		type: "personagens",
		name: $("#character-name").val() || null,
		description: $("#character-description").val() || null,
		imageURL: $("#character-image").val() || null,
		sheetURL: $("#character-sheet").val() || null
	};

	insert(lore, loreObject=>{
		if (loreObject){
			// Success toast message
			$("#add-character-form").trigger("reset");
		} else {
			// Failure toast message
		}
	});
}


export async function submitOtherLore(e) {
	e.preventDefault();

	let lore = {
		type: $("#type-select").val(),
		name: $("#other-name").val() || null,
		description: $("#other-description").val() || null,
		imageURL: $("#other-image").val() || null,
		sheetURL: $("#other-sheet").val() || null
	};

	insert(lore, loreObject=>{
		if (loreObject){
			// Success toast message
			$("#add-other-form").trigger("reset");
		} else {
			// Failure toast message
		}
	});
}