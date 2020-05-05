// --- DOM Variables declaration

let $sideMenu = $('#side-menu');
let $main = $('main');
let $eventDisplay = $('#event-display');
let $map = $('#map');
let $timelines = $('#timelines');
let $loginForm = $("#login-form");
let $contentForm = $("#content-form");

let map;

// Assign buttons onclick methods

$("#menu-button").click(openMenu);
$("#return-arrow").click(closeMenu);
$eventDisplay.click(openPreview);
$("#add-content-button").click(openContentForm);
$("#login-button").click(openLoginForm);
$("#login-form-return-arrow").click(closeLoginForm);
$("#content-form-return-arrow").click(closeContentForm);


// --- Side Menu Functions

let previewOpen = false;

function closeMenu(e) {
	e.preventDefault();
	$sideMenu.css("left", "-100%");
	$main.css("filter", "brightness(100%)").prop("onclick", null).off("click");
	mapEnable(!previewOpen);
}

function openMenu(e) {
	e.preventDefault();
	$sideMenu.css("left", "0");
	$main.css("filter", "brightness(30%)").on("click", closeMenu);
	mapEnable(false);
}

// --- Event Preview Functions

function openPreview(e) {
	e.preventDefault();
	$eventDisplay.addClass("open").prop("onclick", null).off("click");
	$map.css("filter", "brightness(60%)").on('click', closePreview);
	previewOpen = true;
	mapEnable(false);
}

function closePreview(e) {
	e.preventDefault();
	console.log('a');
	$eventDisplay.removeClass("open").on('click', openPreview);
	$map.css("filter", "brightness(100%)").prop("onclick", null).off("click");
	previewOpen = false;
	mapEnable(true);
}

// --- Forms Functions

function openLoginForm(e) {
	e.preventDefault();
	$loginForm.fadeIn('fast');
}

function closeLoginForm(e) {
	e.preventDefault();
	$loginForm.fadeOut('fast');
}

function openContentForm(e) {
	e.preventDefault();
	$contentForm.fadeIn('fast');
}

function closeContentForm(e) {
	e.preventDefault();
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