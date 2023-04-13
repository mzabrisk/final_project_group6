var data = 'https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/separated_tests.json'
console.log(data)

function buildCharts(country) {
    // Use d3.json to load the raw .json file from github link
    d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/main/separated_tests.json").then((data) => {
      console.log(data);
      console.log(data[0])

      var testingScore1_list = []
      var testingScore2_list = []
      var trainingScore1_list = []
      var trainingScore2_list = []
      var x_labels = []

      for (let i=1; i < data.length; i++) {

        var testingScore1 = data[i].TestingScore1
        console.log(testingScore1)
        var testingScore2 = data[i].TestingScore2
        console.log(testingScore2)
        var trainingScore1 = data[i].TrainingScore1
        console.log(trainingScore1)
        var trainingScore2 = data[i].TrainingScore2
        console.log(trainingScore2)

        var testingScore1_trace = {
            x: x_labels,
            y: testingScore1,
            type: 'bar',
            name: 'Testing Score 1'
          }
          ;
          testingScore2_list.push(testingScore2_trace)
          var testingScore2_trace = {
            x: x_values,
            y: testingScore2,
            type: 'bar',
            name: 'Testing Score 2'
          }
          ;
          testingScore1_list.push(testingScore2_trace)

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
              title: {text: "Included Features"
              }
            },
            yaxis: {
              color:
              'white',
              title: {text: "R-Squared Value"
              }
            }
          };



      }










})}

buildCharts()