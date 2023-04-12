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
    buildCharts(firstCountry);
    // start page iwth charts showing all data
  });
}

// Initialize the dashboard
init();

function optionChanged(newCountry) {
  // Fetch new data each time a new country is selected
  buildCharts(newCountry);
  buildAllCharts()
  
}
function optionChanged2(newCountry) {
  // Fetch new data each time a new country is selected
  buildCharts(newCountry);
  buildAllCharts()
  
}

// Clearing the data output
var chartCO2 = []
var chartCancer = []
var chartCigs = []
var normChartCO2 = []

d3.select("#clearButton").on("click", function() {
  chartCO2 = []
  chartCancer = []
  chartCigs = []
  buildCharts('')
  console.log('click')
});

// function clearData()

// Create the buildChart function.
function buildCharts(country) {
  // Use d3.json to load the raw .json file from github link
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/cleaned_json_data.json").then((data) => {
    console.log(data);
    console.log(country)

    // Create variable to hold countries array.
    var country_data = data.data
    console.log(country_data)

    // create variable to hold data filtered for country
    var filteredData = country_data.filter(countryObj => countryObj.country == country)
    console.log(filteredData)

    // Create a variable that holds the first country in the array.
    var result = filteredData[0]
    console.log(result)


    // Create variables that hold the values to be plotted
    var co2 = result.co2
    console.log(co2)
    var co2norm = ((result.co2) / (result.land_area))
    console.log(co2norm)
    var cigarettes = result.cigarette_sales
    console.log(cigarettes)
    var female_cancer = result.female_dealth_rate
    console.log(female_cancer)
    var male_cancer = result.male_death_rate
    console.log(male_cancer)
    var years = result.years
    console.log(years)

    // Creat chart for CO2 emissions
    var co2chart = {
      x: years,
      y: co2,
      type: 'scatter',
      name: country
    };

    chartCO2.push(co2chart)

    var co2Layout = {
      title: {
        text: "CO2 Emissions",
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


    Plotly.newPlot("plot5", chartCO2, co2Layout)

      // Creat chart for cigarette sales
      var cigaretteChart = {
        x: years,
        y: cigarettes,
        type: 'scatter',
        name: country
      };
      console.log(cigaretteChart)

      chartCigs.push(cigaretteChart)
  
      var cigLayout = {
        title: {
          text: "Cigarette Sales",
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
          title: {text: "Year"
          }
        },
        yaxis: {
          color:
          'white',
          title: {text: "Number of Cigarettes Sold <br> (/person/day)"
          }
        }
      };
  
  
      Plotly.newPlot("plot7", chartCigs, cigLayout)

      // Creat chart for lung cancer deaths 
      var cancerChart = {
        x: years,
        y: male_cancer,
        type: 'scatter',
        name: 'Male',
        name: `${country}-male`
      }
      ;
      chartCancer.push(cancerChart)

      var cancerChart2 = {
        x: years,
        y: female_cancer,
        type: 'scatter',
        name: 'Female',
        line: {
          dash: 'dot'
        },
        name: `${country}-female`
      }
      ;
      chartCancer.push(cancerChart2)

  
      var cancerLayout = {
        title: {
          text: "Lung Cancer Deaths",
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
          title: {text: "Year"
          }
        },
        yaxis: {
          color:
          'white',
          title: {text: "Age Standardized Death Rate <br> (/100,000 people)"
          }
        }
      };
  
  
      Plotly.newPlot("plot6", chartCancer, cancerLayout)



            // Creat chart for normalized co2 Emissions 

            var normCO2Chart = {
              x: years,
              y: co2norm,
              type: 'scatter',
              // name: 'Female',
              line: {
                dash: 'dot'
              },
              name: country
            }
            ;
            normChartCO2.push(normCO2Chart)
      
        
            var normCO2Layout = {
              title: {
                text: "Normalized CO2 Emissions",
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
                title: {text: "Year"
                }
              },
              yaxis: {
                color:
                'white',
                title: {text: "CO2 Emissions <br> (kiloton/km^2)"
                }
              }
            };
        
        
            Plotly.newPlot("plot8", normChartCO2, normCO2Layout)


    });
}

