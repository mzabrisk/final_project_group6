// check to see if code is working.
console.log("working");

// Create tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// 2nd tile layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

//3rd tile layer
let navigationNight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create map object
let map = L.map('mapid', {
	center: [25, 0],
	zoom: 3,
	layers: [navigationNight]
});

// Create a base layer that holds all three maps.
let baseMaps = {

  "Night": navigationNight,
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Ad layer groups
let allEarthquakes = new L.LayerGroup();

let countryBoundaries = new L.LayerGroup();

let majorEarthquakes = new L.LayerGroup();



// add layers to overlay object
let overlays = {
  "Countries": countryBoundaries,
  "Earthquakes": allEarthquakes,
  "Major Earthquakes": majorEarthquakes
};

// add control to map
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the country geojson data
d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/custom3.geo.json").then(function(data) {
  console.log(data)

  // create map layer styling
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.pop_est),
      color: "#000000",
      stroke: true,
      weight: 0.5
    };
  }

  // Determine country color
  function getColor(population) {
    if (population > 1000000000) {
      return "#ea2c2c";
    }
    if (population > 200000000) {
      return "#ea822c";
    }
    if (population > 100000000) {
      return "#ee9c00";
    }
    if (population > 50000000) {
      return "#eecc00";
    }
    if (population > 10000000) {
      return "#d4ee00";
    }
    return "#98ee00";
  }


  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		// console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name + "<br>Population: " + feature.properties.pop_est);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/custom3.geo.json").then(function(data) {
  console.log(data)

  // 4. Use the same style as the earthquake data.
  function styleInfoMajor(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColorMajor(feature.properties.continent),
      color: "black",
      // radius: getRadiusMajor(feature.properties.mag),
      stroke: true,
      weight: 1
    };
  }
  
  
  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
  function getColorMajor(continent) {
    if (continent == 'South America') {
      return "yellow";
    }
    if (continent == 'North America') {
      return "#ea2c2c";
    }
    if (continent == 'Asia') {
      return "#ea822c";
    }
    else {
      return "none"
    }
  }

  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
  function getRadiusMajor(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  
  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng)
    },

    style: styleInfoMajor,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name + "<br>Population: " + feature.properties.pop_est)
    }
  }).addTo(majorEarthquakes);
  // 8. Add the major earthquakes layer to the map.
  // majorEarthquakes.addTo(map)
  // 9. Close the braces and parentheses for the major earthquake data.
  });

  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [ , 0, 1, 2, 3, 4, 5];
  const colors = [ , 
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];


  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      (colors[i] ? "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+") : '<h4>All Quakes</h4>');
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);

// Creating legend for majorEarthquakes
  let legend2 = L.control({
    position: "bottomleft"
  });
  
  // Then add all the details for the legend
  legend2.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
  
    const magnitudes = [ ,4.5 , 5, 6];
    const colors = [ ,
      "#ea822c",
      "#ea2c2c",
      "#000000"
    ];

    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        (magnitudes[i] ? "<i style='background: " + colors[i] + "'></i> " +
        (magnitudes[i - 1] ? magnitudes[i] + (magnitudes[i+1] ? "&ndash;" : ""): "<") + (magnitudes[i + 1] ? magnitudes[i + 1] + "<br>" : "+") : '<h4>Major Quakes</h4>');
      }
      return div;
    };

  
    // Finally, we our legend to the map.
    legend2.addTo(map);


  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/custom3.geo.json").then(function(data) {
    console.log(data)

    L.geoJson(data, {
      style: {
        'color': 'blue',
        'weight': '1'
      }}).addTo(countryBoundaries);
    
  });
  // countryBoundaries.addTo(map);
});

