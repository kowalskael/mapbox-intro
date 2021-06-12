'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoiZWx6a293IiwiYSI6ImNrZnpkdmM1czI5YXYzNnN2amswYnB2MnEifQ.UcHiPjGzuQ8VD8WmG4bwFQ'

let map = new mapboxgl.Map({
	container: 'map',
	style:'mapbox://styles/elzkow/ckptlnrys2qzx17meyjc8jgjb',
	center: [4.896307, 52.357061],
	zoom: 12, // początkowy poziom przybliżenia mapy, jeśli nie określony to 0
	preserveDrawingBuffer: true
})

let navigation = new mapboxgl.NavigationControl({
	showCompass: true,
	visualizePitch: true
})

map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
	maxWidth: 80,
	unit: 'metric'
})

map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
	positionOptions: { enableHighAccuracy: true },
	trackUserLocation: true,
	showUserLocation: true
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event){

	let lng = event.coords.longitude
	let lat = event.coords.latitude

	console.log('geolocated:', lng, lat)

	document.getElementById('info').innerText = lng.toFixed(5) + ',' + lat.toFixed(5)

})

map.on('click', function(event){

	let features = map.queryRenderedFeatures({layers:['amsterdam-transport']})
	console.log(features)

	let current_location = [event.lngLat.lng, event.lngLat.lat]
	console.log(current_location)

	if(features == 0) return

	let closest_distance = Infinity
	let closest_feature = null

	for(let feature of features) {
		// obliczanie dystans za pomocą turf.js

		let distance = turf.distance(turf.point(feature.geometry.coordinates), turf.point(current_location))

		if(distance < closest_distance) {
			closest_distance = distance
			closest_feature = feature
		}

	console.log("closest feature: ", closest_feature.geometry.coordinates, closest_distance)

	}

	let bearing = turf.bearing(turf.point(current_location), turf.point(closest_feature.geometry.coordinates))
	console.log(bearing)

	let pointer = document.getElementById('pointer')
	pointer.style.transform = 'rotate(' + bearing + 'deg)'

	map.flyTo({center: current_location})

})










