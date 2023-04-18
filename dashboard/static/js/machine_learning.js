var data = 'https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/Separated_Tests.json'
console.log(data)

console.log([...Array(data.length).keys()])

function buildCharts(country) {
    // Use d3.json to load the raw .json file from github link
    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/dashboard/static/resources/Separated_Tests.json").then((data) => {
      console.log(data);
      console.log(data[0])

      var testingScore1_List = []
      var testingScore2_List = []
      var trainingScore1_List = []
      var trainingScore2_List = []
      var scoreDiff1_List = []
      var scoreDiff2_List = []
      var x_labels = []

      for (let i=0; i < data.length; i++) {
        
        if (data[i].Country == 1) {
            var countryLabel = '+'
        }
        else {
            countryLabel = '-'
        }
        if (data[i].Year == 1) {
            var yearLabel = '+'
        }
        else {
            yearLabel = '-'
        }
        if (data[i].C02_Normalized == 1) {
            var co2Label = '+'
        }
        else {
            co2Label = '-'
        }
        if (data[i].Cigarette_Sales == 1) {
            var cigLabel = '+'
        }
        else {
            cigLabel = '-'
        }
        if (data[i].GDP_normalized == 1) {
            var gdpLabel = '+'
        }
        else {
            gdpLabel = '-'
        }



        x_labels.push(`${countryLabel}<br>${yearLabel}<br>${co2Label}<br>${cigLabel}<br>${gdpLabel}`)


      }

      for (let i=0; i < data.length; i++) {

        var testingScore1 = data[i].Testing1
        console.log(testingScore1)
        testingScore1_List.push(testingScore1)

        var testingScore2 = data[i].Testing2
        console.log(testingScore2)
        testingScore2_List.push(testingScore2)

        var trainingScore1 = data[i].Training1
        console.log(trainingScore1)
        trainingScore1_List.push(trainingScore1)

        var trainingScore2 = data[i].Training2
        console.log(trainingScore2)
        trainingScore2_List.push(trainingScore2)

        var scoreDiff1 = data[i].Training1 - data[i].Testing1
        console.log(scoreDiff1)
        scoreDiff1_List.push(scoreDiff1)

        var scoreDiff2 = data[i].Training2 - data[i].Testing2
        console.log(scoreDiff2)
        scoreDiff2_List.push(scoreDiff2)


        var testingScore1_trace = {
            x: x_labels,
            y: testingScore1_List,
            type: 'bar',
            name: 'Testing Score 1'
          }
          ;
        
          var testingScore2_trace = {
            x: x_labels,
            y: testingScore2_List,
            type: 'bar',
            name: 'Testing Score 2'
          }
          ;
       

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
              // title: {text: "Included Features"
              // }
            },
            yaxis: {
              color:
              'white',
              title: {text: "R-Squared Value"
              },
              labelalias: {0: x_labels[0]}
            }
          };


          var trainingScore1_trace = {
            x: x_labels,
            y: trainingScore1_List,
            type: 'bar',
            name: 'Training Score 1'
          }
          ;
        
          var trainingScore2_trace = {
            x: x_labels,
            y: trainingScore2_List,
            type: 'bar',
            name: 'Training Score 2'
          }
          ;
       

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
              title: {text: "R-Squared Value"
              }
            }
          };


          var scoreDiff1_trace = {
            x: x_labels,
            y: scoreDiff1_List,
            type: 'bar',
            name: 'Training Score 1'
          }
          ;
        
          var scoreDiff2_trace = {
            x: x_labels,
            y: scoreDiff2_List,
            type: 'bar',
            name: 'Training Score 2'
          }
          ;
       

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
              title: {text: "R-Squared Value"
              }
            }
          };



      }

    Plotly.newPlot("plot2", [testingScore1_trace, testingScore2_trace], testingScoreLayout)
    Plotly.newPlot("plot1", [trainingScore1_trace, trainingScore2_trace], trainingScoreLayout)
    Plotly.newPlot("plot3", [scoreDiff1_trace, scoreDiff2_trace], scoreDiffLayout)










})}

buildCharts()