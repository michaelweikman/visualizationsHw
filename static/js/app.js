//Populate demo div
function populateDemoInfo(sample){
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(sample).forEach(([key, value]) => {
        panel.append('p').attr('style', 'font-weight:bold; font-size:12px').text(`${key}: ${value}`)
    });
}

function plotBar(sample){
    yValues = sample['otu_ids'].slice(0,10).map(value => 'OTU ' + value)
    xValues = sample['sample_values'].slice(0, 10);
    textValues = sample['otu_labels'].slice(0, 10);

    var data = [{
            type: 'bar',
            x: xValues,
            y: yValues,
            text: textValues,
            orientation: 'h'
        }];
    
    var layout = {
        yaxis:{
            categoryorder: 'max ascending'
        }
    }

    Plotly.newPlot('bar', data, layout);
}

function plotBubble(sample){
    var trace = [{
        x: sample['otu_ids'],
        y: sample['sample_values'],
        text:  sample['otu_labels'],
        mode: 'markers',
        marker: {
          size: sample['sample_values'],
          color: sample['otu_ids'],
          colorscale: 'Viridis',
        }
      }];;
      
      Plotly.newPlot('bubble', trace);
}

//Lol I tried
function plotGuage(metaData){
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: metaData.wfreq,
            title: { text: "Belly Button Wash Frequency (Eh.. I Tried)" },
            type: "indicator",
            mode: "gauge",
            gauge: { 
                axis: { 
                    range: [0, 9],
                    tickvals: [1,2,3,4,5,6,7,8,9],
                    ticktext: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
                    ticks: "inside",
                    ticklen: 55
                },
                steps: [
                    { range: [0, 1], color: "lightgray"},
                    { range: [1, 2], color: "grey" },
                    { range: [2, 3], color: "darkgrey" },
                    { range: [3, 4], color: "yellow" },
                    { range: [4, 5], color: "skyblue" },
                    { range: [5, 6], color: "blue" },
                    { range: [6, 7], color: "purple" },
                    { range: [7, 8], color: "orange" },
                    { range: [8, 9], color: "teal" },
                ]
            },
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}
async function optionChanged(id){
    var data = await d3.json("samples.json");
    var metaData = data.metadata.filter(item => item.id == id)
    var sample = data.samples.filter(item => item.id ==  id)
    populateDemoInfo(metaData[0]);
    plotBar(sample[0]);
    plotBubble(sample[0]);
    plotGuage(metaData[0]);
}

(async function(){
    var data = await d3.json("samples.json");
    var names = data.names;

    var select = d3.select('#selDataset');    
    select.selectAll('option')
    .data(names)
    .enter().append('option')
    .attr('value', d => { return d; })
    .text(d => { return d; });

    //Calls function against first item in select list. Decided to default first item.
    optionChanged(select.node().value);
})()






