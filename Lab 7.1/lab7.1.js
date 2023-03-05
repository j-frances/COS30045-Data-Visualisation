var w = 600;
var h = 300;

var svg = d3.select("p")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("outline", "solid thin skyblue");

d3.csv("res/Unemployment_78-95.csv", function(d){
    return {
        date: new Date(+d.year, +d.month-1),
        number: +d.number
    };
}).then(function(data){
    var dataset = data;
    lineChart(dataset);
    console.table(dataset, ["date", "number"]);
});

function lineChart(dataset){
    
    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d){ return d.date; }),
            d3.max(dataset, function(d){ return d.date; })
        ])
        .range([0, w]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.number; })
        ])
        .range([h, 0]);
        
    line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.number); });

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);
}           


