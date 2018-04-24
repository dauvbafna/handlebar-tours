'use strict';

function tourDetails (tourId) {
  // -- utility functions

  // -- build the map

  const container = document.getElementById('map');
  const ironhackBCN = {
    lat: 27.7090319,
    lng: 85.2911132
  };
  const options = {
    zoom: 7,
    center: ironhackBCN
  };
  const map = new google.maps.Map(container, options);

  // To add the marker to the map, call setMap();

  axios.get(`/api/${tourId}`)
    .then(response => {
      var stopPosition;
      var markers = [];
      var routeLines = [];
      for (var i = 0; i < 7; i++) {
        stopPosition = response.data.tour.routes[i].coordinates;
        markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(stopPosition[0], stopPosition[1]),
          map: map,
          animation: google.maps.Animation.DROP
        })
        );
      }

      for (var j = 0; j < markers.length - 1; j++) {
        routeLines.push(new google.maps.Polyline({
          path: [
            new google.maps.LatLng(markers[j].position.lat(), markers[j].position.lng()),
            new google.maps.LatLng(markers[j + 1].position.lat(), markers[j + 1].position.lng())
          ],
          strokeColor: '#FF0000',
          strokeOpacity: 1,
          strokeWeight: 7,
          map: map
        }));
      }
      console.log(markers);
    })
    .catch(error => {
      console.log(error);
    });
}
