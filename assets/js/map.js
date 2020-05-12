import {mapPath} from './config.js';

// --- Map Functions

let map;
let locationMap;

export function setupMap() {

	let mapImage = new Image();
	mapImage.src = mapPath;

	mapImage.onload = function () {

		let width = mapImage.width;
		let height = mapImage.height;

		let extent = [0, 0, width, height];

		let projection = new ol.proj.Projection({
			code: 'Condor-map',
			units: 'pixels',
			extent: extent
		});

		map = new ol.Map({
			target: 'map',
			controls: [],
			moveTolerance: 5,
			layers: [
				new ol.layer.Image({
					source: new ol.source.ImageStatic({
						url: mapPath,
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

		locationMap = new ol.Map({
			target: 'location-map',
			controls: [],
			moveTolerance: 5,
			layers: [
				new ol.layer.Image({
					source: new ol.source.ImageStatic({
						url: mapPath,
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


export function setupLocationMap(){
	console.log('aaa');
	// Workaround to fix OpenLayers responsiveness bug
	if (locationMap)
		locationMap.updateSize();
}


export function mapEnable(bool) {
	map.getInteractions().forEach(function (interaction) {
		interaction.setActive(bool);
	}, this);
}