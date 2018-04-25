'use strict';

function tourDetails (tourId) {
  // -- build the map

  const container = document.getElementById('map');
  const defaultPos = {
    lat: 27.7090319,
    lng: 85.2911132
  };
  const options = {
    zoom: 7,
    center: defaultPos
  };

  const map = new google.maps.Map(container, options);

  // To add the marker to the map, call setMap();

  axios.get(`/api/${tourId}`)
    .then(response => {
      let stopPosition;
      let markers = [];
      let routeLines = [];
      const mid = Math.floor((response.data.tour.routes.length) / 2);
      const center = {
        lat: response.data.tour.routes[mid].coordinates[0],
        lng: response.data.tour.routes[mid].coordinates[1]
      };
      map.panTo(center);

      for (let i = 0; i < response.data.tour.routes.length; i++) {
        stopPosition = response.data.tour.routes[i].coordinates;
        markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(stopPosition[0], stopPosition[1]),
          map: map,
          animation: google.maps.Animation.wo
        })
        );
      }

      for (let j = 0; j < markers.length - 1; j++) {
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

// places api

// Animations

// smooth scroll from index - "book tour" button to tours overview div
const smoothScroll = () => {
  $('#book-tour-btn').click(() => {
    $('html, body').animate({
      scrollTop: $('#hp-tour-content').offset().top
    }, 800);
  });
};

window.addEventListener('load', smoothScroll());
