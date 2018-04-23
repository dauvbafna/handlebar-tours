'use strict';

function main () {
  // -- utility functions

  function addMarker (map, location, title) {
    const markerOptions = {
      position: location,
      title: title
    };
    const marker = new google.maps.Map(markerOptions);
    marker.setMap(map);
    return marker;
  }
  // -- build the map -- change the center
  const container = document.getElementById('map');

  const defaultLocation = {
    lat: 41.3977381,
    lng: 2.190471916
  };

  const options = {
    zoom: 15,
    center: defaultLocation
  };

  const map = new google.maps.Map(container, options);

  // getUserLocation((location) => {
  //   const markerOptions = {
  //     position: location,
  //     title: "I'm here"
  //   };
  // const myMarker = new google.maps.Marker(markerOptions);
  // myMarker.setMap(map);
  // });

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
window.addEventListener('load', main);

// adding in data to the routes

// const route1 = {
//   coordinates: [4.123123, 12.23]
// };
// const route2 = {
//   coordinates: [4.123123, 12.23]
// };
// const allRoutes = [route1, route2];
// const newTour = new Tour({routes: allRoutes});




