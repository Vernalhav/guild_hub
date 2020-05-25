"use strict";

import {defaultImagePath, standardLoreTypes, otherLoreTypes} from './config.js';
import {selectAll, selectSingle} from './database.js';
import {openDetails, closeShowContent} from './listeners.js';
import {centerMapOn} from './map.js';


export let currentEvent;
export let eventsResume = [];

/*
	Returns an HTML card with the content
	from the lore object
*/
function createLoreCard(lore, defaultImageURL=defaultImagePath) {
	
	let name = capitalize(lore.name);
	let imageURL = lore.imageURL || defaultImageURL;

	let cardDivString = 
		`<div class="p-2 col-6 col-md-4 col-lg-3">
			<div class="card p-0">
				<div class="card-img-top-container">
					<img src=${imageURL} alt="Imagem de ${name}" class="card-img-top">
				</div>
	            <div class="card-body text-center">
	                <a class="card-title" href="javascript:;">${name}</a>
	            </div>
	        </div>
	    </div>`;

	let card = $(cardDivString);
	card.click(detailsClicked);

	return card;
}


function detailsClicked(e) {

	let $target = $(e.target);
	let loreTitle = $target.closest(".card").find(".card-title").text();
	let loreType = $target.closest("#show-content").find(".show-content-title").text();

	selectSingle(loreType, loreTitle, loreElement=>{
		updateDetailsMenu(loreElement);
	});

	closeShowContent(e);
	openDetails(e);
}


/*
	Arranges the window that is shown
	when a user clicks a side menu lore
	type, like chatacters or locations

	title: string representing window header
	loreArray: array of lore objects to display
*/
export function setupMenuInfo(title, loreArray) {
	$("#show-content > .show-content-title").text(title);

	let $showContentRow = $("#show-content-row");
	$showContentRow.empty();	// Resets all children divs

	loreArray.forEach(element=>{
		$showContentRow.append(createLoreCard(element));
	});
}


/*
	This function should only be called
	once, when the page is loading. It
	sets up the sidebar menu references.
*/
export function setupSidebarMenu() {

	let $menuList = $('#references ul');
	standardLoreTypes.concat(otherLoreTypes).forEach(loreType => {
		$menuList.append(createMenuEntry(loreType));
	});
}

/*
	Sort and display all the events
	on their respective timelines
*/
export function setupTimelineEvents() {
	selectAll("eventos", setupEvents);
}


function setupEvents(events){
		
	let $eventsList = $(".events-list");
	let timelines = {
		"Guilda": {
			number: 1
		},
		"Personagens": {
			number: 2
		},
		"Mundo": {
			number: 3
		}
	};

	// Get all events on database and sort by date
	events.sort(fieldSorter(['period', 'year', 'week', 'order']));

	// Resets all children lis and set the uls' DOM
	$.each($eventsList, function() {
		$(this).empty();
		timelines[$(this).attr("name")].DOM = $(this);
	});
	eventsResume = [];

	// Offset constants in 'vw'
	const initialOffset = 100, offsetBetweenYears = 20, offsetBetweenWeeks = 10, offsetBetweenOrder = 5;
	
	// Insert all events on respectives timelines
	let currentOffset = initialOffset, lastEvent = null;
	events.forEach(event => {
		// Calculate new offset
		if (lastEvent) {
			if (event.date.period !== lastEvent.date.period || event.date.year !== lastEvent.date.year)
				currentOffset += offsetBetweenYears;
			else if (event.date.week !== lastEvent.date.week)
				currentOffset += offsetBetweenWeeks;
			else
				currentOffset += offsetBetweenOrder;
		}

		// Push event to resumes
		eventsResume.push({
			offset: currentOffset,
			title: event.name,
			date: event.date
		});

		// Add event to timelines
		event.timelines.forEach(t => {
			timelines[t].DOM.append(createEvent(currentOffset, timelines[t].number));
		});
		lastEvent = event;
	});

	// Update the timelines' widths adding 100vw after the last event
	$(".timeline").width(`${ currentOffset + 100 }vw`);
}


/*
	Sort function for events by date
*/
"use strict";
const fieldSorter = (fields) => (e1, e2) => fields.map(field => {
	return e1.date[field] > e2.date[field] ? 1 : e1.date[field] < e2.date[field] ? -1 : 0;
}).reduce((p, n) => p ? p : n, 0);


/*
	Returns a event li with respective timeline
	and offset
*/
function createEvent(offset, timeline) {

	return $(`<li class="event timeline-${timeline}" style="left: ${offset}vw;"></li>`);
}


/*
	Returns a sidebar list
	item with title as its text 
*/
function createMenuEntry(title) {
	title = capitalize(title);

	return $(`<li><i class="fas fa-arrow-right"></i>
			<a href="javascript:;" class="side-menu-entry">${title}</a></li>`);
}


/*
	Given an event, display it as the previewed item.
	This function also displays the event's details in
	the details menu by calling updateDetailsMenu
*/
export function updateEventPreview(event, defaultImageURL=defaultImagePath) {

	currentEvent = event;
	
	let previewURL = event.imageURL || defaultImageURL;
	let eventName = capitalize(event.name);
	let eventSummary = event.summary;

	$("#preview-img").attr({
		"src": previewURL,
		"alt": `Imagem de ${eventName}`
	});

	$("#preview-summary").text(eventSummary);

	updateDetailsMenu(event, defaultImageURL);
	event.location && selectSingle('locais', event.location, location => {
		centerMapOn(location);
	});
}


export function updateEventDateAndTitle(event) {
	$("#timeline-year").text(event.date.year + " " + event.date.period);
	$("#selector-header").text("Semana " + event.date.week);
	$("#preview-title").text(capitalize(event.title));
}


/*
	Given a lore object, display its details in the
	details menu.

	NOTE: DOES NOT HANDLE REFERENCES FOR NOW
*/
export function updateDetailsMenu(lore, defaultImageURL=defaultImagePath) {

	let imageURL = lore.imageURL || defaultImageURL;
	let loreType = lore.type.toUpperCase();
	let loreDescription = lore.description || "Description not provided";
	let loreName = capitalize(lore.name);

	$("#details-content > .details-img").attr({
		"src": imageURL,
		"alt": `Imagem de ${loreName}`
	});
	$("#details-content > .details-type").text(loreType);
	$("#details-content > .details-title").text(loreName);
	$("#details-content > .details-description").text(loreDescription);

}


/* Sets up default event on startup */
export function setupEventPreview(title) {
	selectSingle('eventos', title, event=>{
		updateEventPreview(event);
	});
}


export function setupContentForms() {
	let $typeSelect = $("#type-select");

	otherLoreTypes.forEach(loreType=>{
		loreType = capitalize(loreType);
		let currentOption = $(`<option value="${loreType}">${loreType}</option>`);
		$typeSelect.append(currentOption);
	});

	updateLocationList();
}


/* Adds all locations to the location autocomplete dropdown */
export function updateLocationList() {
	let $availableLocations = $("#available-locations");
	$availableLocations.empty();

	selectAll('locais', locationArray=>{
		locationArray.forEach(location=>{
			let currentLocation = $(`<option value="${capitalize(location.name)}">`);
			$availableLocations.append(currentLocation);
		});
	});
}


/*
	NOT WORKING UNTIL WE DEFINE #toast-area IN INDEX.HTML!

	Shows a toast to the user that fades
	after specified delay in ms. Message
	content appears in the body and headerMsg
	appears as the toast header.
*/
function toast(message, delay=1000, headerMsg=""){

	let toast = $(
		`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
	        	<strong class="mr-auto">${headerMsg}</strong>
	        	<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
	          		<span aria-hidden="true">&times;</span>
	        	</button>
	      	</div>
	      	<div class="toast-body">
	        	${message}
	      	</div>
    	</div>`);

	// toast.toast({delay: delay});
	// $("#toast-area").append(toast);
	// toast.toast("show");
}


/* Capitalize first letter of each word in the string */
function capitalize(str) {
	str = str.split(" ");

    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}