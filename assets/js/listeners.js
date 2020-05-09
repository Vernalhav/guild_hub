import {mapEnable} from "./map.js";
import {setupMenuInfo} from "./dynamic_content.js";
import {selectAll} from "./database.js";

// Assign buttons onclick methods

let $sideMenu = $('#side-menu');
let $contentDetails = $("#content-details");
let $main = $('main');
let $eventDisplay = $('#event-display');
let $map = $('#map');
let $timelines = $('#timelines');
let $loginForm = $("#login-form");
let $contentForm = $("#content-form");
let $showContent = $("#show-content");


export function setupListeners() {
	$("#menu-button").click(openMenu);
	$("#return-arrow").click(closeMenu);
	$("#details-return-arrow").click(closeDetails);
	$("#add-content-button").click(openContentForm);
	$("#login-button").click(openLoginForm);
	$("#login-form-return-arrow").click(closeLoginForm);
	$("#content-form-return-arrow").click(closeContentForm);
	$("#show-content-return-arrow").click(closeShowContent);
	
	$(".side-menu-entry").click(openShowContent);

	$eventDisplay.click(openPreview);
}


function openShowContent(e) {
	let clickedCategory = $(e.target).text();

	selectAll(clickedCategory, loreArray => {
		setupMenuInfo(clickedCategory, loreArray);
	});

	e.stopPropagation();
	$showContent.fadeIn('fast');
}


export function closeShowContent(e) {
	e.stopPropagation();
	$showContent.fadeOut('fast');
}


// --- Side Menu Functions

let previewOpen = false;

function closeMenu(e) {
	e.stopPropagation();
	$sideMenu.css("left", "-100%");
	$main.css("filter", "brightness(100%)").off("click");
	mapEnable(!previewOpen);
}

function openMenu(e) {
	e.stopPropagation();
	$sideMenu.css("left", "0");
	$main.css("filter", "brightness(30%)").on("click", closeMenu);
	mapEnable(false);
}

function closeDetails(e) {
	e.stopPropagation();
	$contentDetails.css("left", "-100%");
	$main.css("filter", "brightness(100%)").off("click");
	mapEnable(true);
}

export function openDetails(e) {
	e.stopPropagation();
	closePreview(e);
	closeMenu(e);
	$contentDetails.css("left", "0");
	$main.css("filter", "brightness(30%)").on("click", closeDetails)
	mapEnable(false);
}

// --- Event Preview Functions

function openPreview(e) {
	e.stopPropagation();
	$eventDisplay.addClass("open").on('click', openDetails);
	$map.css("filter", "brightness(60%)").on('click', closePreview);
	previewOpen = true;
	mapEnable(false);
}

function closePreview(e) {
	e.stopPropagation();
	$eventDisplay.removeClass("open").prop("onclick", null).off("click").on('click', openPreview);
	$map.css("filter", "brightness(100%)").off("click");
	previewOpen = false;
	mapEnable(true);
}

// --- Forms Functions

function openLoginForm(e) {
	e.stopPropagation();
	$loginForm.fadeIn('fast');
}

function closeLoginForm(e) {
	e.stopPropagation();
	$loginForm.fadeOut('fast');
}

function openContentForm(e) {
	e.stopPropagation();
	$contentForm.fadeIn('fast');
}

function closeContentForm(e) {
	e.stopPropagation();
	$contentForm.fadeOut('fast');
}