function init() {
    // Grab  reference to dropdown selection
    var selector = d3.select("#selDataset");
    // var selector2 = d3.select("#selDataset2");
  
    // Use  country name list to populate dropdown menu
    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/merged_json_data3.json").then((data) => {
      console.log(data)
  
      var countryNames = data.country;
  
      countryNames.forEach((country) => {
        selector
          .append("option")
          .text(country)
          .property("value", country);
      });
      console.log(selector)
  
  
      // Use the first country from the list to build the initial plots
      var firstCountry = countryNames[0];
      
      // start page iwth charts showing all data
      buildAllCharts(firstCountry);
    });
  }
  
  // Initialize the dashboard
  init();
  
  // Clearing the data output
  var chartCO2 = []
  var chartCancer = []
  var chartCigs = []
  
  // CREATING CHART WITH ALL CO2 DATA
  
  // Create the buildChart function.
  function buildAllCharts(stuff) {
    // Use d3.json to load the raw .json file from github link
    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/merged_json_data3.json").then((data) => {
      console.log(data);
  
      // Create variable to hold countries array.
      var country_data = data.data
      console.log(country_data)
  
  // LOOP THROUGH ALL COUNTRY DATA AND ADD TO SAME CHART
  var co2Emissions = []
 
  for (let i=0; i < country_data.length; i++) {
      // Create variables that hold the values to be plotted
      var co2 = country_data[i].co2
      console.log(co2)

      var years = country_data[i].years
      console.log(years)
    
        // Creat chart for co2 emissions
        var co2Trace = {
          x: years,
          y: co2,
          type: 'scatter',
          name: country_data[i].country
        }
        ;
        co2Emissions.push(co2Trace)
    
        var co2Layout = {
          title: {
            text: "CO<sub>2</sub> Emissions",
            font: {
              color:'white'
            }
          },
          legend: {
            font: {
              color: 'white'
            }
          },
          paper_bgcolor:'rgba(0,0,0,0)',
          plot_bgcolor:'rgba(0,0,0,0)',
          xaxis: {
            color:'white',
            title: {text: "Year"}
          },
          yaxis: {
            color:
            'white',
            title: {text: "Carbon Dioxide Emissions <br> (kiloton)"}
          }
        };      
      }
   
        Plotly.newPlot("plot3", co2Emissions, co2Layout)
  
      });
  }