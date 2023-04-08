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
      buildAllCharts(firstCountry);
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
    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/merged_json_data3.json").then((data) => {
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
  
        // cancers = [cancerChart, cancerChart2]
    
        var cancerLayout = {
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
    
    
        Plotly.newPlot("plot6", chartCancer, cancerLayout)
  
  
      });
  }
  
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
  var maleCancers = []
  var femaleCancers = []
  var co2Emissions = []
  var cigaretteSales = []
  for (let i=0; i < country_data.length; i++) {
      // Create variables that hold the values to be plotted
      var co2 = country_data[i].co2
      console.log(co2)
      var cigarettes = country_data[i].cigarette_sales
      console.log(cigarettes)
      var female_cancer = country_data[i].female_dealth_rate
      console.log(female_cancer)
      var male_cancer = country_data[i].male_death_rate
      console.log(male_cancer)
      var years = country_data[i].years
      console.log(years)
    
        
        console.log(cancers)
        // Creat chart for male lung cancer deaths 
        var maleCancerTrace = {
          x: years,
          y: male_cancer,
          type: 'scatter',
          name: country_data[i].country
        }
        ;
        maleCancers.push(maleCancerTrace)
    
        var maleCancerLayout = {
          title: {
            text: "Male Lung Cancer Deaths",
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
            title: {text: "Age Standardized Death Rate <br> (/100,000 people)"}
          }
        };
  
        // Creat chart for female lung cancer deaths 
        var femaleCancerTrace = {
          x: years,
          y: female_cancer,
          type: 'scatter',
          name: country_data[i].country
        }
        ;
        femaleCancers.push(femaleCancerTrace)
    
        var femaleCancerLayout = {
          title: {
            text: "Female Lung Cancer Deaths",
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
            title: {text: "Age Standardized Death Rate <br> (/100,000 people)"}
          }
        };
  
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
  
      // Creat chart for cigarette sales
      var cigaretteTrace = {
        x: years,
        y: cigarettes,
        type: 'scatter',
        name: country_data[i].country
      }
      ;
      cigaretteSales.push(cigaretteTrace)
  
      var cigaretteLayout = {
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
      
      }
        // Plotly.newPlot("plot1", maleCancers, maleCancerLayout)
        // Plotly.newPlot("plot2", femaleCancers, femaleCancerLayout)
        // Plotly.newPlot("plot3", co2Emissions, co2Layout)
        // Plotly.newPlot("plot4", cigaretteSales, cigaretteLayout)
    
  
      });
  }