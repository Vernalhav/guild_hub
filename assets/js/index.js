import {setupListeners} from "./listeners.js";
import {setupMap} from "./map.js";
import {setupTimeline} from "./timeline.js"
import {getLoreCard} from "./dynamic_content.js"

// --- DOM Variables declaration

let $loginForm = $("#login-form");
let $contentForm = $("#content-form");
let $showContent = $("#show-content");

function setupMenuInfo(title, loreArray=null){
	$("#show-content > p").text(title);

	if (loreArray == null){
		// For testing purposes
		let item = {
			name: "Relógio misterioso",
			imagePath: "https://vignette.wikia.nocookie.net/obradinn/images/1/1c/Pocketwatch.png/revision/latest/scale-to-width-down/340?cb=20181117150030"
		};

		let $show_content_row = $("#show-content-row");
		for (let i = 0; i < 10; i++){
			$show_content_row.append(getLoreCard(item));
		}
	} else {
		let $show_content_row = $("#show-content-row");
		for (let i = 0; i < loreArray.length; i++){
			$show_content_row.append(getLoreCard(loreArray[i]));
		}
	}
}

// --- Main Code

function main() {
	setupMap();
	setupListeners();
	setupTimeline();

	$loginForm.hide();
	$contentForm.hide();
	$showContent.hide();


	setupMenuInfo("Itens");
}

main();