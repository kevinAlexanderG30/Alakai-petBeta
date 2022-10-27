let map;
let marcadores= [];


function initMap() {
    const bangalore = { lat: 12.97, lng: 77.59 };
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:12.13046, lng: -86.26912 },
    zoom: 17,
  });


  // This event listener calls addMarker() when the map is clicked.
google.maps.event.addListener(map, "click", (event) => {
    //console.log(event.latLng.lat())
    //console.log(event.latLng.lng())
    //console.log(event.latLng.toLocaleString())
    addMarker(event.latLng, map);
    console.log(event.latLng.toLocaleString())
    if (marcadores.length > 1) {
        hideMarkers();
    }

});

  // Add a marker at the center of the map.
  addMarker(bangalore, map);


// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  
  let marker = new google.maps.Marker({
    position: location,
   // label: labels[labelIndex++ % labels.length],
    map: map,
  });
  marcadores.push(marker);
 
  //console.log(marcadores);

}

//console.log("L" + marcadores.length

    
// setea el marcador de la posicion 0 y elimina el ultimo elemento de la lista de marcadores
function setMapOnAll(map) {
    
    //console.log(marcadores); 
    marcadores[0].setMap(map);
    marcadores.shift()

  }
  
  // Removes the markers from the map, but keeps them in the array.
  function hideMarkers() {
    setMapOnAll(null);
  }
  
  

}


window.initMap = initMap;