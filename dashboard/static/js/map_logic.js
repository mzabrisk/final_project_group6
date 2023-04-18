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
let co2EmissionsNorm = new L.LayerGroup();
let lungCancerDeathRateMale = new L.LayerGroup();
let lungCancerDeathRateFemale = new L.LayerGroup();

// add layers to overlay object
let overlays = {
  "CO2 Emissions": co2Emissions,
  "CO2 Emissions Normalized": co2EmissionsNorm,
  "Lung Cancer Death Rate (Total)": lungCancerDeathRate,
  "Lung Cancer Death Rate (Male)": lungCancerDeathRateMale,
  "Lung Cancer Death Rate (Female)": lungCancerDeathRateFemale,
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
      fillOpacity: 0.6,
      fillColor: getColorPop(feature.properties.pop_est),
      color: "black",
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
      fillOpacity: 0.6,
      fillColor: getColorCO2(feature.properties.co2_emissions),
      color: "black",
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by emissions
  function getColorCO2(co2_emissions) {
    if (co2_emissions == 0) {
      return "white";
    }
    if (co2_emissions < 10000) {
      return "green";
    }
    if (co2_emissions < 50000) {
      return "yellow";
    }
    if (co2_emissions < 100000) {
      return "#ffcc66";
    }
    if (co2_emissions < 500000) {
      return "#cc7a00";
    }
    if (co2_emissions < 1000000) {
      return "red";
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


  // Create CO2Norm style function
  function styleInfoCO2Norm(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.6,
      fillColor: getColorCO2Norm(feature.properties.co2_emissions / feature.properties.land_area),
      color: "black",
      
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by emissions
  function getColorCO2Norm(co2_emissions_norm) {
    if (co2_emissions_norm < .1) {
      return "green";
    }
    if (co2_emissions_norm < .4) {
      return "yellow";
    }
    if (co2_emissions_norm < .7) {
      return "#ffcc66";
    }
    if (co2_emissions_norm < 1) {
      return "#cc7a00";
    }
    if (co2_emissions_norm < 1.5) {
      return "red";
    }
    if (co2_emissions_norm >= 1.5) {
      return "black";
    }
    else {
      return "white"
    }
  }


  // Creating CO2 EMISSIONS Layer 
  L.geoJson(data, {
    style: styleInfoCO2Norm,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name  + "<br>CO2 Emissions (kiloton/km^2): " + numberWithCommas((feature.properties.co2_emissions / feature.properties.land_area).toFixed(2)))
    }
  }).addTo(co2EmissionsNorm);


  // Create TOTAL DEATHS style function
  function styleInfoDeaths(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.6,
      fillColor: getColorDeaths((feature.properties.female_death_rate + feature.properties.male_death_rate)/2),
      color: "black",
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by DEATHS
  function getColorDeaths(deaths) {
    if (deaths == 0) {
      return "white";
    }
    if (deaths < 10) {
      return "green";
    }
    if (deaths < 25) {
      return "yellow";
    }
    if (deaths < 40) {
      return "#ffcc66";
    }
    if (deaths < 55) {
      return "#cc7a00";
    }
    if (deaths < 70) {
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


    // Create MALE DEATHS style function
    function styleInfoDeathsMale(feature) {
      return {
        opacity: 1,
        fillOpacity: 0.6,
        fillColor: getColorDeathsMale(feature.properties.male_death_rate),
        color: "black",
        stroke: true,
        weight: 1
      };
    }
    
    // Color function to set country color by DEATHS
    function getColorDeathsMale(male_deaths) {
      if (male_deaths == 0) {
        return "white";
      }
      if (male_deaths < 10) {
        return "green";
      }
      if (male_deaths < 25) {
        return "yellow";
      }
      if (male_deaths < 40) {
        return "#ffcc66";
      }
      if (male_deaths < 55) {
        return "#cc7a00";
      }
      if (male_deaths < 70) {
        return "red";
      }
      else {
        return "black"
      };
    }

    // Creating MALE DEATHS Layer 
    L.geoJson(data, {
      style: styleInfoDeathsMale,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Country: " + feature.properties.name  + "<br>Lung Cancer Death Rate (/100k men): " + (feature.properties.male_death_rate).toFixed(2))
      }
    }).addTo(lungCancerDeathRateMale);



        // Create FEMALE DEATHS style function
        function styleInfoDeathsFemale(feature) {
          return {
            opacity: 1,
            fillOpacity: 0.6,
            fillColor: getColorDeathsFemale(feature.properties.female_death_rate),
            color: "black",
            stroke: true,
            weight: 1
          };
        }
        
        // Color function to set country color by FEMALE DEATHS
        function getColorDeathsFemale(female_deaths) {
          if (female_deaths == 0) {
            return "white";
          }
          if (female_deaths < 10) {
            return "green";
          }
          if (female_deaths < 25) {
            return "yellow";
          }
          if (female_deaths < 40) {
            return "#ffcc66";
          }
          if (female_deaths < 55) {
            return "#cc7a00";
          }
          if (female_deaths < 70) {
            return "red";
          }
          else {
            return "black"
          };
        }
      
        // Creating FEMALE DEATHS Layer 
        L.geoJson(data, {
          style: styleInfoDeathsFemale,
          onEachFeature: function(feature, layer) {
            layer.bindPopup("Country: " + feature.properties.name  + "<br>Lung Cancer Death Rate (/100k women): " + (feature.properties.female_death_rate).toFixed(2))
          }
        }).addTo(lungCancerDeathRateFemale);



  // Create CIGARETTE SALES style function
  function styleInfoCigs(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.6,
      fillColor: getColorCigs(feature.properties.cigarette_sales),
      color: "black",
      stroke: true,
      weight: 1
    };
  }
  
  // Color function to set country color by CIGARETTE SALES
  function getColorCigs(sales) {
    if (sales == 0) {
      return "white";
    }
    if (sales < 4) {
      return "green";
    }
    if (sales < 5) {
      return "yellow";
    }
    if (sales < 6) {
      return "#ffcc66";
    }
    if (sales < 7) {
      return "#cc7a00";
    }
    if (sales < 8) {
      return "red";
    }
    else {
      return "black"
    }
  }


  // Creating CIG SALES Layer 
  L.geoJson(data, {
    style: styleInfoCigs,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name  + "<br>Cigarette Sales (/person/day): " + (feature.properties.cigarette_sales).toFixed(2))
    }
  }).addTo(cigaretteSales);


  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const scale = [ , 'unknown', 'lowest', 'low', 'medium', 'high', 'highest', 'extreme'];
  const colors = [ , 
    "white",
    "green",
    "yellow",
    "#ffcc66",
    "#cc7a00",
    "red",
    "black"
  ];


  for (var i = 0; i < scale.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      (colors[i] ? "<i style='background: " + colors[i] + "'></i> " +
      scale[i] + (scale[i + 1] ?  "<br>" : "") : '');
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);
});

