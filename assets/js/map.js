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

		let domOverlay = $(`<i class="map-overlay fas fa-angle-down fa-2x"></i>`)[0];
		
		let overlay = new ol.Overlay({
			element: domOverlay,
			offset: [0, -5],
			positioning: 'center-center',
			position: null,
			id: 'location-select'
		});

		locationMap = new ol.Map({
			target: 'location-map',
			controls: [],
			moveTolerance: 5,
			overlays: [overlay],
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

		locationMap.on("click", event=>{
			let coords = event.coordinate;
			console.log(coords);
			overlay.setPosition(coords);
		});
	}
}


export function setupLocationMap(){
	// Workaround to fix OpenLayers responsiveness bug
	locationMap.updateSize();
}


export function centerMapOn(location) {
	if (!location.coordinates) return;

	map.getView().animate({center: location.coordinates});
}


// Returns array of coordinates, or null if overlay is not positioned.
export function getFormLocation() {
	return locationMap.getOverlayById('location-select').getPosition();
}


export function resetFormOverlay() {
	locationMap.getOverlayById('location-select').setPosition(null);
}


export function mapEnable(bool) {
	map.getInteractions().forEach(interaction=>{
		interaction.setActive(bool);
	}, this);
}