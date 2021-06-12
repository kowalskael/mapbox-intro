'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoiZWx6a293IiwiYSI6ImNrZnpkdmM1czI5YXYzNnN2amswYnB2MnEifQ.UcHiPjGzuQ8VD8WmG4bwFQ'

let map = new mapboxgl.Map({
	container: 'map',
	style:'mapbox://styles/elzkow/ckpsh6imm3xbb18psqitjnayj',
	center: [16.919042000457015, 52.409760173971776],
	zoom: 16, // początkowy poziom przybliżenia mapy, jeśli nie określony to 0
	pitch: 45, // pułap lotu
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

	let lng = event.lngLat.lng
	let lat = event.lngLat.lat

	console.log('clicked:', lng, lat)

	document.getElementById('info').innerText = lng.toFixed(5) + ',' + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([16.919042000457015, 52.409760173971776])
marker.addTo(map)

let popup = new mapboxgl.Popup().setHTML('UAM <br /> ul.Fredry 10 <br /><img src="https://amu.edu.pl/__data/assets/image/0014/24413/WFPIK-siedziba.jpg"/>')
marker.setPopup(popup)

document.getElementById('downloadLink').onclick = function downloadImg() {
	let img = map.getCanvas().toDataURL('image/png')
	this.href = img;
}







