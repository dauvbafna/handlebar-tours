'use strict';

function tourDetails (tourId) { // eslint-ignore no-unused-vars
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
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(stopPosition[0], stopPosition[1]),
          animation: google.maps.Animation.wo
        });
        markers.push(marker);
        marker.addListener('click', () => {
          var panoramaOptions = {
            addressControl: false,
            position: new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()),
            pov: {
              heading: 50, /* North */
              pitch: 0, /* Look down at angle 40deg */
              zoom: 0
            },
            visible: true
          };
          var streetview = new google.maps.StreetViewPanorama(document.getElementById('streetview'),
            panoramaOptions);

          console.log('clicked on marker', i);
          console.log(markers[i].position.lat());
        });
      }

      for (let j = 0; j < markers.length; j++) {
        window.setTimeout(() => {
          markers[j].setMap(map);
          if (!j) {
            return;
          }
          routeLines.push(new google.maps.Polyline({
            path: [
              new google.maps.LatLng(markers[j - 1].position.lat(), markers[j - 1].position.lng()),
              new google.maps.LatLng(markers[j].position.lat(), markers[j].position.lng())
            ],
            strokeColor: 'red',
            strokeOpacity: 1,
            strokeWeight: 7,
            map: map
          }));
        }, (j + 1) * 500);
      }
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
