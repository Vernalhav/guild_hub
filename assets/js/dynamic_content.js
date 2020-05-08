import {defaultImagePath, standardLoreTypes, otherLoreTypes} from './config.js';
import {selectAll} from './database.js';


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
	            <img src=${imageURL} alt="Imagem de ${name}" class="card-img-top">
	            <div class="card-body text-center">
	                <a class="card-title">${name}</a>
	            </div>
	        </div>
	    </div>`;

	return $(cardDivString);
}


/*
	Arranges the window that is shown
	when a user clicks a side menu lore
	type, like chatacters or locations

	title: string representing window header
	loreArray: array of lore objects to display
*/
export function setupMenuInfo(title, loreArray){
	$("#show-content > p").text(title);

	let $showContentRow = $("#show-content-row");
	$showContentRow.empty();	// Resets all previous divs

	loreArray.forEach((element)=>{
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
	Returns a sidebar list
	item with title as its text 
*/
function createMenuEntry(title){
	title = capitalize(title);

	return $(`<li><i class="fas fa-arrow-right"></i>
			<a href="javascript:;" class="side-menu-entry">${title}</a></li>`);
}


export function updateEventPreview(event, defaultImageURL=defaultImagePath){
	let previewURL = event.imageURL || defaultImageURL;
	let eventName = capitalize(event.name);
	let eventSummary = event.summary;

	$("#preview-img").attr("src", previewURL);
	$("#preview-title").text(eventName);
	$("#preview-summary").text(eventSummary);

}


/* Sets up default event on startup */
export function setupEventPreview(){
	// TEST ONLY. NOT A GOOD IMPLEMENTATION
	selectAll('eventos', eventArray => {
		updateEventPreview(eventArray[1]);
	});
}


/* Capitalize first letter of each word in the string */
function capitalize(str){
	str = str.split(" ");

    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}