var data = 'https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/Separated_Tests.json'
console.log(data)

console.log([...Array(data.length).keys()])


chart = d3.select("#feature1").on("change",updateChart);
chart = d3.select("#feature2").on("change",updateChart);
chart = d3.select("#feature3").on("change",updateChart);
chart = d3.select("#feature4").on("change",updateChart);
chart = d3.select("#feature5").on("change",updateChart);
updateChart();


function updateChart() {

    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/Separated_Tests.json").then((data) => {

    if(d3.select("#feature1").property("checked")) {
        data = data.filter(dataObj => dataObj.Country == 1)
        console.log(data)
    }
    else {
        data = data
    }
 
    if(d3.select("#feature2").property("checked")) {
        data = data.filter(dataObj => dataObj.Year == 1)
    }
    else {
        data = data
    }

    if(d3.select("#feature3").property("checked")) {
        data = data.filter(dataObj => dataObj.C02_Normalized == 1)
    }
    else {
        data = data
    }

    if(d3.select("#feature4").property("checked")) {
        data = data.filter(dataObj => dataObj.Cigarette_Sales == 1)
    }
    else {
        data = data
    }

    if(d3.select("#feature5").property("checked")) {
        data = data.filter(dataObj => dataObj.GDP_normalized == 1)
    }
    else {
        data = data
    }


    var testingScore1_List = []
    var testingScore2_List = []
    var testingScoreAvg_List = []
    var trainingScore1_List = []
    var trainingScore2_List = []
    var trainingScoreAvg_List = []
    var scoreDiff1_List = []
    var scoreDiff2_List = []
    var scoreDiffAvg_List = []
    var x_labels = []

    for (let i=0; i < data.length; i++) {
      
      if (data[i].Country == 1) {
          var countryLabel = "<span style='color:white'>+</span>"
      }
      else {
          countryLabel = "<span style='color:white'>-</span>"
      }
      if (data[i].Year == 1) {
          var yearLabel = "<span style='color:red'>+</span>"
      }
      else {
          yearLabel = "<span style='color:red'>-</span>"
      }
      if (data[i].C02_Normalized == 1) {
          var co2Label = "<span style='color:#CBC3E3'>+</span>"
      }
      else {
          co2Label = "<span style='color:#CBC3E3'>-</span>"
      }
      if (data[i].Cigarette_Sales == 1) {
          var cigLabel = "<span style='color:lightgreen'>+</span>"
      }
      else {
          cigLabel = "<span style='color:lightgreen'>-</span>"
      }
      if (data[i].GDP_normalized == 1) {
          var gdpLabel = "<span style='color:yellow'>+</span>"
      }
      else {
          gdpLabel = "<span style='color:yellow'>-</span>"
      }

      x_labels.push(`${countryLabel}<br>${yearLabel}<br>${co2Label}<br>${cigLabel}<br>${gdpLabel}`)

    }
    // x_labels.push("Country<br>Year<br>CO2<br>Cigs<br>GDP")

    for (let i=0; i < data.length; i++) {

      var testingScore1 = data[i].Testing1
      console.log(testingScore1)
      testingScore1_List.push(testingScore1)

      var testingScore2 = data[i].Testing2
      console.log(testingScore2)
      testingScore2_List.push(testingScore2)

      var testingScore = (testingScore1 + testingScore2) / 2
      testingScoreAvg_List.push(testingScore)

      var trainingScore1 = data[i].Training1
      console.log(trainingScore1)
      trainingScore1_List.push(trainingScore1)

      var trainingScore2 = data[i].Training2
      console.log(trainingScore2)
      trainingScore2_List.push(trainingScore2)

      var trainingScore = (trainingScore1 + trainingScore2) / 2
      trainingScoreAvg_List.push(trainingScore)

      var scoreDiff1 = data[i].Training1 - data[i].Testing1
      console.log(scoreDiff1)
      scoreDiff1_List.push(scoreDiff1)

      var scoreDiff2 = data[i].Training2 - data[i].Testing2
      console.log(scoreDiff2)
      scoreDiff2_List.push(scoreDiff2)

      var scoreDiff = (scoreDiff1 + scoreDiff2) / 2
      scoreDiffAvg_List.push(scoreDiff)

// Testing Score Graph
      var testingScore_trace = {
          x: x_labels,
          y: testingScoreAvg_List,
          type: 'bar',
          name: 'Testing Score 1'
        }
        ;
      
        // var testingScore2_trace = {
        //   x: x_labels,
        //   y: testingScore2_List,
        //   type: 'bar',
        //   name: 'Testing Score 2'
        // }
        // ;
     

      var testingScoreLayout = {
          title: {
            text: "Random Forest Regression Testing Scores",
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
            tickangle: 0
            // title: {text: "Included Features"
            // }
          },
          yaxis: {
            color:
            'white',
            title: {text: "R-Squared Value<br>(mean n=2)"
            },
            labelalias: {0: x_labels[0]}
          }
        };

//  Training Score Graph
        var trainingScore_trace = {
          x: x_labels,
          y: trainingScoreAvg_List,
          type: 'bar',
          name: 'Training Score 1'
        }
        ;
      
        // var trainingScore2_trace = {
        //   x: x_labels,
        //   y: trainingScore2_List,
        //   type: 'bar',
        //   name: 'Training Score 2'
        // }
        // ;
     

      var trainingScoreLayout = {
          title: {
            text: "Random Forest Regression Training Scores",
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
            // title: {text: "Included Features"
            // },
            title_standoff: 10
          },
          yaxis: {
            color:
            'white',
            title: {text: "R-Squared Value<br>(mean n=2)"
            }
          }
        };

//  Score Diff Graph
        var scoreDiff_trace = {
          x: x_labels,
          y: scoreDiffAvg_List,
          type: 'bar',
          name: 'Training Score 1'
        }
        ;
      
        // var scoreDiff2_trace = {
        //   x: x_labels,
        //   y: scoreDiff2_List,
        //   type: 'bar',
        //   name: 'Training Score 2'
        // }
        // ;
     

      var scoreDiffLayout = {
          title: {
            text: "Random Forest Regression Training/Testing Score Differentials",
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
            // title: {text: "Included Features"
            // },
            title_standoff: 10
          },
          yaxis: {
            color:
            'white',
            title: {text: "Difference in Training/Testing <br>R-Squared Values (mean n=2)"
            }
          }
        };
    }

  Plotly.newPlot("plot2", [testingScore_trace], testingScoreLayout)
  Plotly.newPlot("plot1", [trainingScore_trace], trainingScoreLayout)
  Plotly.newPlot("plot3", [scoreDiff_trace], scoreDiffLayout)

})}

updateChart()