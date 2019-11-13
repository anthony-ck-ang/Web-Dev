//https://developer.mapquest.com/documentation/mapquest-js/v1.3/

//let apiKey = prompt("Please enter your api key");
let apiKey = "";

function mapQuest(k){
    L.mapquest.key = k;

    //https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-tile-layer/
    // 'map' refers to a <div> element with the ID map
    let map = L.mapquest.map('map', {
      center: [37.7749, -122.4194],
      layers: L.mapquest.tileLayer('dark'),
      zoom: 13
    });
    
    map.addControl(L.mapquest.control({
      position: 'topright',
    }));
    
//    map.addControl(L.mapquest.satelliteControl({
//      position: 'bottomright',
//      title: 'Satellite',
//      className: ''
//    }));
    
    //https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-directions-control/
    let dc = L.mapquest.directionsControl({
      className: '',
      directions: {
        options: {
          timeOverage: 25,
          doReverseGeocode: false,
        }
      },
      directionsLayer: {
        startMarker: {
          title: 'Drag to change location',
          draggable: true,
          icon: 'marker-start',
          iconOptions: {
            size: 'sm'
          }
        },
        endMarker: {
          draggable: true,
          title: 'Drag to change location',
          icon: 'marker-end',
          iconOptions: {
            size: 'sm'
          }
        },
        viaMarker: {
          title: 'Drag to change route'
        },
        routeRibbon: {
          showTraffic: true
        },
        alternateRouteRibbon: {
          showTraffic: true
        },
        paddingTopLeft: [450, 20],
        paddingBottomRight: [180, 20],
      },
      startInput: {
        compactResults: true,
        disabled: false,
        location: {},
        placeholderText: 'Starting point or click on the map...',
        geolocation: {
          enabled: true
        },
        clearTitle: 'Remove starting point'
      },
      endInput: {
        compactResults: true,
        disabled: false,
        location: {},
        placeholderText: 'Destination',
        geolocation: {
          enabled: true
        },
        clearTitle: 'Remove this destination'
      },
      addDestinationButton: {
        enabled: true,
        maxLocations: 10,
      },
      routeTypeButtons: {
        enabled: true,
      },
      reverseButton: {
        enabled: true,
      },
      optionsButton: {
        enabled: true,
      },
      routeSummary: {
        enabled: true,
        compactResults: false,
      },
      narrativeControl: {
        enabled: true,
        compactResults: false,
        interactive: true,
      }
    }).addTo(map);
    
    //Add Marker (icon)
    L.marker([37.7749, -122.4194], {
          icon: L.mapquest.icons.marker({
            primaryColor: '#262626',
            secondaryColor: '#ffffff',
            shadow: true,
            size: 'md',
            symbol: 'A'
          })
        })
        .bindPopup('Hellooo!!!')
        .addTo(map);
    
//    dc.setFirstDestination({
//      latLng: {
//        lat: 1.3521,
//        lng: 103.8198
//      }
//    });

}
 
mapQuest(apiKey);


