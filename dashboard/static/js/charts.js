function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/matt_dashboard/dashboard/static/resources/merged_data.json").then((data) => {
    console.log(data)
    var sampleNames = ['abd', '123', 'xyz']
    // var sampleNames = data.names;

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
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/matt_dashboard/dashboard/static/resources/merged_data.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("https://raw.githubusercontent.com/mzabrisk/final_project_group6/matt_dashboard/dashboard/static/resources/merged_data.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array.
    var samples_array = data.samples
    console.log(samples_array)

    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samples_array.filter(sampleObj => sampleObj.id == sample)
    console.log(filteredSample)

    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var selectMetadata = data.metadata.filter(meta => meta.id == sample)
    console.log(selectMetadata)

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var result = filteredSample[0]
    console.log(result)

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    metaResult = selectMetadata[0]
    console.log(metaResult)

    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids
    console.log(otuIds)
    var otuLabels = result.otu_labels
    console.log(otuLabels)
    var sampleValues = result.sample_values
    console.log(sampleValues)

    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    var washFreq = metaResult.wfreq
    console.log(washFreq)


    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0,10).reverse().map(id => `OTU ${id}`);
    console.log(yticks)

    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: 'bar',
      orientation: 'h',
    }
    ];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: {
        text: "Top 10 Bacteria Cultures Found",
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

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 

    Plotly.newPlot("bar", barData, barLayout)

    // Deliverable 2: 1. Create the trace for the bubble chart.
    var bubbleTrace = [{
      x: otuIds,
      y: sampleValues,
      type: 'scatter',
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Portland'
      },
      text: otuLabels
    }]

    // Deliverable 2: 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
        text: 'Bacteria Cultures Per Sample',
        font: {
          color:'white'
        }
      },
      yaxis: {
        color:'white'
      },
      xaxis: {
        title: 'OTU ID',
        color: 'white'
      },
      hovermode: 'closest',
      hoverlabels: {otuLabels},
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
    }

    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout)
    
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var gaugeTrace = [{
      domain: {
        x: [0,1],
        y: [0,1]
      },
      value: washFreq,
      type: 'indicator',
      mode: 'gauge+number',
      number: {font: {color:'white'}},
      gauge: {
        axis: {range: [null, 10], dtick: 2},
        steps: [
          {range: [0, 2], color: 'red'},
          {range: [2, 4], color: 'orange'},
          {range: [4, 6], color: 'yellow'},
          {range: [6, 8], color: 'yellowgreen'},
          {range: [8, 10], color: 'green'}
        ],
        bar: {color: 'grey'},
      },
      title: {
        text: 'Scrubs per Week',
        font:{color:'white'}
      }
    }
  ]
    
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: {
        text: 'Belly Button Washing Frequency',
        font: {
          color:'white'
        }
      },
      font:{color:'white'},
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'
    }

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeTrace, gaugeLayout)

  });
}
