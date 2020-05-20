import {setupListeners} from "./listeners.js";
import {setupMap} from "./map.js";
import {setupTimeline} from "./timeline.js";
import {setupSidebarMenu, setupContentForms, setupTimelineEvents} from "./dynamic_content.js";
import {setupDatabase} from "./database.js";

// --- Main Code

function main() {
	setupDatabase();

	setupMap();
	setupSidebarMenu();
	setupTimelineEvents();
	setupTimeline();
	setupContentForms();

	$("#login-form").hide();
	$("#content-form").hide();
	$("#show-content").hide();
	
	setupListeners();	// Listeners should come after all the site is set up
}

main();