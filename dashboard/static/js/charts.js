function init() {
  // Grab  reference to dropdown selection
  var selector = d3.select("#selDataset");

  // Use  country name list to populate dropdown menu
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/matt_dashboard/dashboard/static/resources/merged_json_data.json").then((data) => {
    console.log(data)

    var sampleNames = data.country;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(selector)

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  
}



// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the raw .json file from github link
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/matt_dashboard/dashboard/static/resources/merged_json_data.json").then((data) => {
    console.log(data);

    // Create variable to hold countries array.
    var country_data = data.data
    console.log(country_data)

    // create variable to hold data filtered for country
    var filteredData = country_data.filter(sampleObj => sampleObj.country == sample)
    console.log(filteredData)

    // Create a variable that holds the first sample in the array.
    var result = filteredData[0]
    console.log(result)


    // Create variables that hold the values to be plotted
    var co2 = result.co2
    console.log(co2)
    var cigarettes = result.cigarette_sales
    console.log(cigarettes)
    var female_cancer = result.female_dealth_rate
    console.log(female_cancer)
    var male_cancer = result.male_death_rate
    console.log(male_cancer)
    var years = result.years
    console.log(years)

    // Creat chart for CO2 emissions
    var co2chart = [{
      x: years,
      y: co2,
      type: 'scatter'
    }
    ];

    var co2Layout = {
      title: {
        text: "CO2 Emissions",
        font: {
          color:'white'
        }
      },
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      xaxis: {
        color:'white'
      },
      yaxis: {
        color:
        'white'
      }
    };


    Plotly.newPlot("plot2", co2chart, co2Layout)

      // Creat chart for cigarette sales
      var cigaretteChart = [{
        x: years,
        y: cigarettes,
        type: 'scatter'
      }
      ];
  
      var cigLayout = {
        title: {
          text: "Cigarette Sales",
          font: {
            color:'white'
          }
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        xaxis: {
          color:'white'
        },
        yaxis: {
          color:
          'white'
        }
      };
  
  
      Plotly.newPlot("plot3", cigaretteChart, cigLayout)

      // Creat chart for lung cancer deaths 
      var cancerChart = {
        x: years,
        y: male_cancer,
        type: 'scatter'
      }
      ;

      var cancerChart2 = {
        x: years,
        y: female_cancer,
        type: 'scatter'
      }
      ;

      cancers = [cancerChart, cancerChart2]
  
      var cigLayout = {
        title: {
          text: "Lung Cancer Deaths",
          font: {
            color:'white'
          }
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        xaxis: {
          color:'white'
        },
        yaxis: {
          color:
          'white'
        }
      };
  
  
      Plotly.newPlot("plot4", cancers, cigLayout)
    });
}
