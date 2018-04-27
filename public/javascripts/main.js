'use strict';

function tourDetails (tourId) { // eslint-disable-line no-unused-vars
  // -- build the map

  // To add the marker to the map, call setMap();

  axios.get(`/api/${tourId}`)
    .then(response => {
      let stopPosition;
      let markers = [];
      let routeLines = [];

      for (let i = 0; i < response.data.tour.routes.length; i++) {
        stopPosition = response.data.tour.routes[i].coordinates;
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(stopPosition[0], stopPosition[1]),
          animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        console.log(markers);

        // Add marker event listener and street view

        marker.addListener('click', () => {
          var panoramaOptions = {
            addressControl: false,
            position: new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()),
            pov: {
              heading: 180,
              pitch: 0,
              zoom: 0
            },
            visible: true
          };
          var streetview = new google.maps.StreetViewPanorama(document.getElementById('streetview'),
            panoramaOptions);

          console.log('clicked on marker', i);
        });
      }

      // initilaise map
      var container = document.getElementById('map');
      var defaultPos = {
        lat: 27.7090319,
        lng: 85.2911132
      };
      var options = {
        zoom: 7,
        center: defaultPos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(container, options);
      getDirections(map);

      const mid = Math.floor((response.data.tour.routes.length) / 2);
      const center = {
        lat: response.data.tour.routes[mid].coordinates[0],
        lng: response.data.tour.routes[mid].coordinates[1]
      };

      // map.panTo(center);

      // google direction services

      function getDirections (map) {
        let directionsService = new google.maps.DirectionsService();
        let request = createRequest();
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            autoRefresh(map, result.routes[0].overview_path);
          }
        });
      }

      function createRequest () {
        let waypoints = [];
        for (let i = 1; i < markers.length - 1; i++) {
          const newLocation = new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng());
          const newWaypoint = {
            location: newLocation,
            stopover: true
          };
          waypoints.push(newWaypoint);
        }

        var origin = {
          lat: markers[0].position.lat(),
          lng: markers[0].position.lng()
        };

        var destination = {
          lat: markers[markers.length - 1].position.lat(),
          lng: markers[markers.length - 1].position.lng()
        };

        let request = {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING
        };

        return request;
      }

      function moveMarker (map, marker, latlng) {
        marker.setPosition(latlng);
        map.panTo(latlng);
      }

      // Animation code goes here
      function autoRefresh (map, pathCoords) {
        let i, route, marker;

        route = new google.maps.Polyline({
          path: [],
          geodesic: true,
          strokeColor: '#CD5C5C',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          editable: false,
          map: map
        });

        marker = new google.maps.Marker({map: map, icon: '/images/bikeicon.png'});
        let anime = 26;
        let idx = 0;
        for (i = 0; i < pathCoords.length; i++) {
          setTimeout(function (coords) {
            if (anime === 26) {
              markers[idx].setMap(map);
              idx++;
              anime = 0;
            }
            anime++;
            route.getPath().push(coords);
            moveMarker(map, marker, coords);
          }, 200 * i * 0.2, pathCoords[i]);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// smooth scroll from index - "book tour" button to tours overview div
const smoothScroll = () => {
  $('#book-tour-btn').click(() => {
    $('html, body').animate({
      scrollTop: $('#hp-tour-content').offset().top
    }, 800);
  });
};

window.addEventListener('load', smoothScroll());
