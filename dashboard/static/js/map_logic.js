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

// Add layer groups
let lungCancerDeathRate = new L.LayerGroup();
let co2Emissions = new L.LayerGroup();
let cigaretteSales = new L.LayerGroup();
let countryPopulation = new L.LayerGroup();

// add layers to overlay object
let overlays = {
  "CO2 Emissions": co2Emissions,
  "Lung Cancer Death Rate": lungCancerDeathRate,
  "Cigarette Sales": cigaretteSales,
  "Population": countryPopulation
};

// add control to map
L.control.layers(baseMaps, overlays).addTo(map);

//  from https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Retrieve the country geojson data
d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/project_map.geo.json").then(function(data) {
  console.log(data)

  // POPULATION map layer
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColorPop(feature.properties.pop_est),
      color: "#000000",
      stroke: true,
      weight: 0.5
    };
  }

  // Determine POPULATION country color
  function getColorPop(population) {
    if (population > 1000000000) {
      return "black";
    }
    if (population > 200000000) {
      return "red";
    }
    if (population > 100000000) {
      return "#cc7a00";
    }
    if (population > 50000000) {
      return "#ffcc66";
    }
    if (population > 10000000) {
      return "yellow";
    }
    else{
      return "green";
    }
  }

  // Creating POPULATION GeoJSON
  L.geoJson(data, {
    style: styleInfo,
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name + "<br>Population: " + numberWithCommas(feature.properties.pop_est));
    }
  }).addTo(countryPopulation);






  // Create CO2 style function
  function styleInfoCO2(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColorCO2(feature.properties.co2_emissions),
      color: "white",
      // radius: getRadiusMajor(feature.properties.mag),
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by emissions
  function getColorCO2(co2_emissions) {
    if (co2_emissions == 0) {
      return "none";
    }
    if (co2_emissions < 10000) {
      return "green";
    }
    if (co2_emissions < 50000) {
      return "yellow";
    }
    if (co2_emissions < 100000) {
      return "orange";
    }
    if (co2_emissions < 1000000) {
      return "#ff0000";
    }
    else {
      return "black"
    }
  }

  // Creating CO2 EMISSIONS Layer 
  L.geoJson(data, {
    style: styleInfoCO2,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name  + "<br>CO2 Emissions (kiloton): " + numberWithCommas(feature.properties.co2_emissions.toFixed(0)))
    }
  }).addTo(co2Emissions);
  co2Emissions.addTo(map);







  // Create DEATHS style function
  function styleInfoDeaths(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColorDeaths((feature.properties.female_death_rate + feature.properties.male_death_rate)/2),
      color: "white",
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by DEATHS
  function getColorDeaths(deaths) {
    if (deaths == 0) {
      return "none";
    }
    if (deaths < 20) {
      return "green";
    }
    if (deaths < 25) {
      return "yellow";
    }
    if (deaths < 30) {
      return "orange";
    }
    if (deaths < 35) {
      return "red";
    }
    else {
      return "black"
    }
  }

  // Creating DEATHS Layer 
  L.geoJson(data, {
    style: styleInfoDeaths,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name  + "<br>Lung Cancer Death Rate (/100k people): " + ((feature.properties.female_death_rate + feature.properties.male_death_rate)/2).toFixed(2))
    }
  }).addTo(lungCancerDeathRate);







  // Create CIGARETTE SALES style function
  function styleInfoCigs(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColorCigs(feature.properties.cigarette_sales),
      color: "white",
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by CIGARETTE SALES
  function getColorCigs(sales) {
    if (sales == 0) {
      return "none";
    }
    if (sales < 4) {
      return "green";
    }
    if (sales < 5) {
      return "yellow";
    }
    if (sales < 6) {
      return "orange";
    }
    if (sales < 7) {
      return "red";
    }
    else {
      return "black"
    }
  }

  // Creating DEATHS Layer 
  L.geoJson(data, {
    style: styleInfoCigs,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name  + "<br>Cigarette Sales (/person/day): " + (feature.properties.cigarette_sales).toFixed(2))
    }
  }).addTo(cigaretteSales);





// LEGEND STILL NEEDS WORK
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

// Creating legend for co2Emissions
  let legend2 = L.control({
    position: "bottomleft"
  });
  
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


//   // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  // d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/project_map.geo.json").then(function(data) {
  //   console.log(data)

  //   L.geoJson(data, {
  //     style: {
  //       'color': 'blue',
  //       'weight': '1'
  //     }}).addTo(countryBoundaries);
    
  // });
  // countryBoundaries.addTo(map);
});

