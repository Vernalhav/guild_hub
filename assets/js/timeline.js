
// --- Click and Drag Timeline

let $timelines = $("#timelines");

let isDown = false,
	startX, scrollLeft;

export function setupTimeline(){

	$timelines.on({
		"mousedown": (e) => {
			isDown = true;
			startX = e.pageX - $timelines.offset().left;
			scrollLeft = $timelines.scrollLeft();
		},
		"mouseleave mouseup": () => {
			isDown = false;
		},
		"mousemove": (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - $timelines.offset().left;
			const walk = (x - startX) * 1.5; //scroll-fast
			$timelines.scrollLeft(scrollLeft - walk);
		}
	})
}
