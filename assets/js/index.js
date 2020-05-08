import {setupListeners} from "./listeners.js";
import {setupMap} from "./map.js";
import {setupTimeline} from "./timeline.js"
import {setupSidebarMenu, setupEventPreview} from "./dynamic_content.js"

// --- DOM Variables declaration

let $loginForm = $("#login-form");
let $contentForm = $("#content-form");
let $showContent = $("#show-content");


// --- Main Code

function main() {
	setupMap();
	setupSidebarMenu();
	setupTimeline();

	setupEventPreview();

	$loginForm.hide();
	$contentForm.hide();
	$showContent.hide();
	
	setupListeners();	// Listeners should come after all the site is set up
}

main();