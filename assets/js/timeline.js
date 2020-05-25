"use strict";

import { eventsResume, updateEventDateAndTitle, setupEventPreview } from "./dynamic_content.js";
import { closePreview } from "./listeners.js";

// --- Click and Drag Timeline

let $timelines = $("#timelines");

let isDown = false,
	startX, scrollLeft;

let nearestEvent = null;

export function setupTimeline(){
	
	updateNearestEvent();
	updateScroll();
	
	$timelines.on({
		"mousedown": (e) => {
			isDown = true;
			startX = e.pageX - $timelines.offset().left;
			scrollLeft = $timelines.scrollLeft();
			closePreview(e);
		},
		"mouseleave mouseup": () => {
			isDown = false;
			updateScroll();
		},
		"mousemove": (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - $timelines.offset().left;
			const walk = (x - startX) * 1.5; //scroll-fast
			$timelines.scrollLeft(scrollLeft - walk);
			updateNearestEvent();
		}
	})
}

/*
	Get nearest event to scroll handler
*/
function updateNearestEvent() {
	nearestEvent = getNearestEvent(eventsResume,
		($timelines.scrollLeft() - 19) * 100 / $(window).width() + 50,
		(a, b) => { return a < b.offset ? -1 : a > b.offset ? 1 : 0; });
	updateEventDateAndTitle(nearestEvent);
}

/*
	Update timelines scroll to match
	selected event
*/
function updateScroll() {
	$timelines.stop().animate({ scrollLeft: (nearestEvent.offset - 50) * $(window).width() / 100 + 19 }, 500, 'swing', function() {
		// Update event resume
		setupEventPreview(nearestEvent.title);
	});
}

/*
	When window resizes it should recalculate scroll
	due to offset is in 'vw'
*/
$(window).resize(function() {
	$timelines.scrollLeft((nearestEvent.offset - 50) * $(window).width() / 100 + 19);
})

/*
	Get the nearest event on events array
	using binary search
*/
function getNearestEvent(ar, el, compare_fn) {
	var m = 0;
	var n = ar.length - 1;
	while (m <= n) {
		var k = (n + m) >> 1;
		var cmp = compare_fn(el, ar[k]);
		if (cmp > 0) {
			m = k + 1;
		} else if (cmp < 0) {
			n = k - 1;
		} else {
			return ar[k];
		}
	}
	m = Math.min(m, ar.length-1);
	return ar[ar[m-1] ? nearestAmong(ar, m, m-1, el) : m];
}

/*
	Get the nearest event among
	two options
*/
function nearestAmong(ar, el1, el2, val) {
	return (Math.abs(val - ar[el1].offset) <= Math.abs(val - ar[el2].offset)) ? el1 : el2;
}
