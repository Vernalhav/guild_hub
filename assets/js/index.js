import {setupListeners} from "./listeners.js";
import {setupMap} from "./map.js";
import {setupTimeline} from "./timeline.js"

// --- DOM Variables declaration

let $loginForm = $("#login-form");
let $contentForm = $("#content-form");
let $showContent = $("#show-content");

// --- Main Code

function main() {
	setupMap();
	setupListeners();
	setupTimeline();

	$loginForm.hide();
	$contentForm.hide();
	$showContent.hide();
}

main();