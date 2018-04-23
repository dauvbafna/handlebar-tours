'use strict';

function main () {
  // -- utility functions

  // function addMarker (map, location, title) {
  //   const markerOptions = {
  //     position: location,
  //     title: title
  //   };
  //   const marker = new google.maps.Map(markerOptions);
  //   marker.setMap(map);
  //   return marker;
  // }

// -- build the map

  const container = document.getElementById('map');
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const options = {
    zoom: 15,
    center: ironhackBCN
  };
  const map = new google.maps.Map(container, options);

  const marker = new google.maps.Marker({
    position: ironhackBCN
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);

  //   axios.get('/spots/json')
  //     .then(response => {
  //       response.data.forEach((spot) => {
  //         // addMarker(map, {spot.lat: 41.4001150, spot.lng: 2.210870}, spot.name);
  //         console.log(spot);
  //       });
  //     });
  //   getUserLocation()
  //     .then((userLocation) => {
  //       if (userLocation) {
  //         addMarker(map, userLocation, 'your location');
  //       }
  //     });
  // }
}
window.addEventListener('load', main);
