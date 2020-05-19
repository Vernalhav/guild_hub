import {setupListeners} from "./listeners.js";
import {setupMap} from "./map.js";
import {setupTimeline} from "./timeline.js";
import {setupSidebarMenu, setupEventPreview, setupContentForms, setupTimelineEvents} from "./dynamic_content.js";
import {setupDatabase} from "./database.js";

// --- DOM Variables declaration

let $loginForm = $("#login-form");
let $contentForm = $("#content-form");
let $showContent = $("#show-content");


// --- Main Code

function main() {
	setupDatabase();

	setupMap();
	setupSidebarMenu();
	setupTimeline();
	setupTimelineEvents();
	setupContentForms();

	setupEventPreview();

	$loginForm.hide();
	$contentForm.hide();
	$showContent.hide();
	
	setupListeners();	// Listeners should come after all the site is set up
}

main();