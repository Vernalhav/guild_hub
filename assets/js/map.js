function setupMap(){
	console.log("Setting up map...");

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
				center: ol.extent.getCenter(extent)
			})
		});
	}
}

setupMap();