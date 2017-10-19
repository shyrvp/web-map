mapboxgl.accessToken='pk.eyJ1IjoiYXJ0aHVyc2hpIiwiYSI6ImNqNzB1OW45cDBjZTMzM254MHVyYXk3ZmgifQ.PfqI-7HMTNf8ZV35R9hwaA';
var Lagoon = [-0.6470, 5.3286];
var Deer = [-0.6427, 5.3467];
var map = new mapboxgl.Map({
	container: 'map',
	center: [-0.633, 5.343],
	zoom: 13,
	minZoom: 4,
	maxZoom: 18,
	style: 'mapbox://styles/arthurshi/cj8yo5r45daud2ss9lqoqowt5' 
});

 map.on('click', function(e) {
      var sites = map.queryRenderedFeatures(e.point, {
        layers: ['sacred sites'] // replace this with the name of the layer
      });
            if (!sites.length) {
        return;
      }

    var sacred = sites[0];
     var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

         popup.setLngLat(sacred.geometry.coordinates);
         popup.setHTML('<h4>Site Name: ' + sacred.properties.site   // 'stop_id' field of the dataset will become the title of the popup
                           + '</h4><p>' + sacred.properties.disc // 'stop_name' field of the dataset will become the body of the popup
                           + '</p>');
           popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

 map.on('click', function(e) {
      var migr = map.queryRenderedFeatures(e.point, {
        layers: ['Migration Route'] // replace this with the name of the layer
      });
            if (!migr.length) {
        return;
      }

    var mig = migr[0];
     var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'top', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

         popup.setLngLat(mig.geometry.coordinates);
         popup.setHTML('<h4>' + mig.properties.number   // 'stop_id' field of the dataset will become the title of the popup
                           + '</h4><p>' + mig.properties.name // 'stop_name' field of the dataset will become the body of the popup
                           + '</p>');
           popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });


var toggleableLayerIds = [ 'new building by 2013', 'building 1972','sacred sites','Migration Route','Linear Route' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

// create the popup
var popup = new mapboxgl.Popup()
    .setText('The Muni-Pomadze lagoon is one of five coastal Ramsar sites in Ghana and one of many along the country’s coastline. It is an intermittently closed lagoon with extreme seasonal hydrological and physical-chemical variation. From 1972 to 2014 the high water mark has shifted landwards with an average retreat rate of 0.22 m/year. Evidence of erosion and sediment washover indicate loss of and a shift landward of the sand barrier separating the lagoon from the ocean.A more open lagoon system stabilizes hydrological and physicochemical conditions, leading to increases in biodiversity and aquatic productivity. But on the other hand, urban development and waste water pollution as well as more and more agricultural land also threaten the sustainability of the lagoon and Winneba city. ');

// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';

// create the marker
new mapboxgl.Marker(el)
    .setLngLat(Lagoon)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);


var popup = new mapboxgl.Popup()
    .setText('The Aboakyer Festival is the largest and most important religious ceremony within the community of Winneba and is performed primarily as an act of thanksgiving to the deity Penkyae Out. The deer hunting festival is celebrated on the first Saturday in May. On the first day of the festival, the two Asafo Companies (warrior groups) in Winneba take part in a hunting expedition. The first troop to catch a live bushbuck from a game reserve used for this purpose and present it to the chiefs and people at a colorful durbar is declared winner and is highly regarded for bravery.[4] The bushbuck is sacrificed and this signifies the start of the Aboakyer festival. The festival is used also to receive a productive harvest and spiritual guidance from their gods for the coming year. ');
// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker1';

// create the marker
new mapboxgl.Marker(el)
    .setLngLat(Deer)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);