import {defaultImagePath, standardLoreTypes, otherLoreTypes} from './config.js';
import {selectAll, selectSingle} from './database.js';
import {openDetails, closeShowContent} from './listeners.js';
import {centerMapOn} from './map.js';


export let currentEvent;

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
	
	let events = [];
	let $eventsList = $(".events-list");

	// Get all events on database and sort based on date
	selectAll("eventos", event => {
		events.push(event);
	});
	events = events[0];
	events.sort(fieldSorter(['period', 'year', 'week', 'order']));
	// console.log(events);

	// Resets all children lis
	$.each($eventsList, function() {
		$(this).empty();
	});

	// Insert all events on respectives timelines
	const initialOffset = 50, offsetBetweenYears = 20, offsetBetweenWeeks = 10, offsetBetweenOrder = 5;
	let currentOffset = initialOffset, lastEvent = null;
	events.forEach(event => {
		if (lastEvent) {

		}

		lastEvent = event;
	});

}

/*
	Sort function for events by date
*/
"use strict";
const fieldSorter = (fields) => (a, b) => fields.map(o => {
	let dir = 1;
	if (o[0] === '-') { dir = -1; o = o.substring(1); }
	return a.date[o] > b.date[o] ? dir : a.date[o] < b.date[o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);


/*
	Returns a sidebar list
	item with title as its text 
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
	$("#preview-title").text(eventName);
	$("#preview-summary").text(eventSummary);

	updateDetailsMenu(event, defaultImageURL);
	centerMapOn(event.location);
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
export function setupEventPreview() {
	// TEST ONLY. NOT A GOOD IMPLEMENTATION
	selectSingle('eventos', 'os primeiros membros', event=>{
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