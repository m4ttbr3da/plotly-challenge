
// Initializes arrays for traversing JSON file

function init(){
    d3.json("samples.json").then((incomingdata)=>{
        var name_array = incomingdata.names;
        // console.log(name_array);
        var metadata = incomingdata.metadata;
        // console.log(metadata);
        var sample = incomingdata.samples;
        // console.log(sample);
        var choice = d3.select("#selDataset");
        var index = 0;
        name_array.forEach(element => {
            // console.log(element);
            var specimen = choice.append("option");
            specimen.attr("value",index).text(element);
            index = index + 1;
        });
        horizontalbar(sample[0]);
        bubblegraph(sample[0]);
        createmeta(metadata[0]);

    });
};

init();

// Creates intereactivity around drop-down menu

d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(){
    var dropdown = d3.select("#selDataset");
    var dataset = dropdown.property("value");
    d3.json("samples.json").then((incomingdata)=>{
        var metadata = incomingdata.metadata;
        var sample = incomingdata.samples;
        horizontalbar(sample[dataset]);
        bubblegraph(sample[dataset]);
        createmeta(metadata[dataset]);
    });
};

// Creates horizontal bar chart for showing OTU frequency by Test Subject ID

function horizontalbar(value){
    var otu = "OTU ";
    var yaxis = [];
    value.otu_ids.slice(0,10).forEach(y => yaxis.push(otu.concat(y)));
    var trace = {
        x: value.sample_values.slice(0,10).reverse(),
        y: yaxis.reverse(),
        text: value.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    };
    var chartdata = [trace];


    Plotly.newPlot("bar", chartdata);
};

// Creates bubblegraph for visualizing OTU frequency by Test Subject ID

function bubblegraph(value){
    var trace = {
        x: value.otu_ids,
        y: value.sample_values,
        text: value.otu_labels,
        mode: "markers",
        marker:{
            color: value.otu_ids,
            size: value.sample_values
        }
    };

    var chartdata = [trace];

    Plotly.newPlot("bubble", chartdata);
};

// Fills descriptive table with information specific to Test Subject ID selected from drop-down

function createmeta(value){
    var list = d3.select(".panel-body");
    list.html("");
    list.append("li").text(`${Object.keys(value)[0]}: ${Object.values(value)[0]}`);
    list.append("li").text(`${Object.keys(value)[1]}: ${Object.values(value)[1]}`);
    list.append("li").text(`${Object.keys(value)[2]}: ${Object.values(value)[2]}`);
    list.append("li").text(`${Object.keys(value)[3]}: ${Object.values(value)[3]}`);
    list.append("li").text(`${Object.keys(value)[4]}: ${Object.values(value)[4]}`);
    list.append("li").text(`${Object.keys(value)[5]}: ${Object.values(value)[5]}`);
    list.append("li").text(`${Object.keys(value)[6]}: ${Object.values(value)[6]}`);

}; 