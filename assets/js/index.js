function closeMenu(e) {
    $("#side-menu").css("left", "-100%");
    $("main").css("filter", "brightness(100%)");
}

function openMenu(e) {
    $("#side-menu").css("left", "0");
    $("main").css("filter", "brightness(30%)");
}


function setupMap(){

	var map_image = new Image();
	map_image.src = 'assets/img/Condor.png';

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
			layers: [
				new ol.layer.Image({
					source: new ol.source.ImageStatic({
						url: 'assets/img/Condor.png',
						projection: projection,
						imageExtent: extent
					})
				})
			],
			target: 'map',
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

setupMap();