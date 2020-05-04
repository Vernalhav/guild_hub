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


function openLoginForm(e) {
	$("#login-form").fadeIn('fast');
}


function closeLoginForm(e) {
	$("#login-form").fadeOut('fast');
}


function setupMap() {

	image_url = 'img/Condor.png';
	var map_image = new Image();
	map_image.src = image_url;

	map_image.onload = function (){

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

function main() {
	setupMap();
	$("#login-form").hide();	
}


main();