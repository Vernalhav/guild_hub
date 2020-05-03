// --- Side Menu Functions

function closeMenu(e) {
	$("#side-menu").css("left", "-100%");
	$("main").css("filter", "brightness(100%)");

	$("main").on("click", null);
}

function openMenu(e) {
	$("#side-menu").css("left", "0");
	$("main").css("filter", "brightness(30%)");

	$("main").on("click", closeMenu);
}

// --- Map Functions

function setupMap() {

	image_url = 'img/Condor.png';
	var map_image = new Image();
	map_image.src = image_url;

	map_image.onload = function () {

		let width = map_image.width;
		let height = map_image.height;

		let extent = [0, 0, width, height];

		let projection = new ol.proj.Projection({
			code: 'Condor-map',
			units: 'pixels',
			extent: extent
		});

		let map = new ol.Map({
			target: 'map',
			controls: [],
			layers: [
				new ol.layer.Image({
					source: new ol.source.ImageStatic({
						url: image_url,
						projection: projection,
						imageExtent: extent
					})
				})
			],
			view: new ol.View({
				projection: projection,
				center: ol.extent.getCenter(extent),
				maxZoom: 4,
				zoom: 3,
				smoothExtentConstraint: false,
				extent: extent
			})
		});
	}
}

// --- Click and Drag Timeline

let $timelines = $('#timelines');
let isDown = false,
	startX, scrollLeft;

$timelines.on({
	"mousedown": (e) => {
		isDown = true;
		startX = e.pageX - $timelines.offset().left;
		scrollLeft = $timelines.scrollLeft();
		console.log('ae')
	},
	"mouseleave mouseup": () => {
		isDown = false;
		console.log('opa')
	},
	"mousemove": (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - $timelines.offset().left;
		const walk = (x - startX) * 1.5; //scroll-fast
		$timelines.scrollLeft(scrollLeft - walk);
	}
})

// --- Main Code

setupMap();