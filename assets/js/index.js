// --- DOM Variables declaration

let $sideMenu = $('#side-menu');
let $main = $('main');
let $eventDisplay = $('#event-display');
let $map = $('#map');
let $timelines = $('#timelines');
let $loginForm = $("#login-form");
let $contentForm = $("#content-form");

let map;
let previewOpen = false;

// --- Side Menu Functions

function closeMenu(e) {
	$sideMenu.css("left", "-100%");
	$main.css("filter", "brightness(100%)").on("click", null);
	mapEnable(!previewOpen);
}

function openMenu(e) {
	$sideMenu.css("left", "0");
	$main.css("filter", "brightness(30%)").on("click", closeMenu);
	mapEnable(false);
}

// --- Event Preview Functions

function openPreview(e) {
	$eventDisplay.addClass("open").on('click', null);
	$map.css("filter", "brightness(60%)").on('click', closePreview);
	previewOpen = true;
	mapEnable(false);
}

function closePreview(e) {
	$eventDisplay.removeClass("open").on('click', openPreview);
	$map.css("filter", "brightness(100%)").on('click', null);
	previewOpen = false;
	mapEnable(true);
}

// --- Forms Functions

function openLoginForm(e) {
	$loginForm.fadeIn('fast');
}

function closeLoginForm(e) {
	$loginForm.fadeOut('fast');
}

function openContentForm(e) {
	$contentForm.fadeIn('fast');
}

function closeContentForm(e) {
	$contentForm.fadeOut('fast');
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

		map = new ol.Map({
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

function mapEnable(bool) {
	map.getInteractions().forEach(function (interaction) {
		interaction.setActive(bool);
	}, this);
}

// --- Click and Drag Timeline

let isDown = false,
	startX, scrollLeft;

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

// --- Main Code

function main() {
	setupMap();
	$loginForm.hide();
	$contentForm.hide();
}


main();