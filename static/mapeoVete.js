let marcadores = [];
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.11748259762615, lng: -86.26703253421367 },
    zoom: 13,
    mapTypeId: "roadmap",
    mapId: "578064e81e64e0ba"
  });

  //Evente de agregar marcador
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
    addMarker(event.latLng, map);
    //console.log(event.latLng.toLocaleString())
    if (marcadores.length > 1) {
      hideMarkers();


    }
    let button = document.createElement("button")
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#staticBackdrop");
    document.body.appendChild(button);
    button.click();
    button.style.display= "none";

    //console.log(event.latLng.lat())
    //console.log(event.latLng.lng())
    //console.log(event.address_components)
    document.getElementById('location').innerHTML = event.formatted_address;
    document.getElementById('lat').innerHTML = event.latLng.lat;
    document.getElementById('lon').innerHTML = event.latLng.lng;
    get_api(event);
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();

    
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyB3m9wlqgD89f7eUtrzdfndeKkYozZWalI")
      .then((response) => response.json()).then((dato)=>{   
        console.log(dato);
        //disminuir lo extraido de la api  
        //get_api(dato)  
     }) 

  });

  /*agrega los marcadores*/
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


  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    //*marcadores de busqueda*//
    console.log(places);
   
    if (places.length == 0) {
      return;
    }
//////
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  /*montar marcadores*/
  function setMapOnAll(map) {

    //console.log(marcadores); 
    marcadores[0].setMap(map);
    marcadores.shift()

  }

  // Removes the markers from the map, but keeps them in the array.
  function hideMarkers() {
    setMapOnAll(null);
  }


  function get_api(get_api) {

    const dict_values = {get_api} //Pass the javascript variables to a dictionary.
    const s = JSON.stringify(dict_values); // Stringify converts a JavaScript object or value to a JSON string
    //console.log(s); // Prints the variables to console window, which are in the JSON format
    //window.alert(s)
    $.ajax({
        url:"/test",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(s)});

  }

}

window.initAutocomplete = initAutocomplete;