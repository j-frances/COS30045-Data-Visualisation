var w = 1000;
var h = 500;
var padding = 100;

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
        .range([0, w - padding]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.number; })
        ])
        .range([h - padding, 0]);
        
    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("transform", "translate(" + padding + ", 0)")
        .attr("d", d3.area()
        .x(function(d) { return xScale(d.date) })
        .y0(function() { return yScale.range()[0] })
        .y1(function(d) { return yScale(d.number) })
        );

    var xAxis = d3.axisBottom()
        .ticks(5)
        .scale(xScale);
    
    var yAxis = d3.axisLeft()
        .ticks(5)
        .scale(yScale);
    
    svg.append("g")
        .attr("transform", "translate(" + padding + ", "+(h - padding) +")")
        .call(xAxis);
    
    svg.append("g")
        .attr("transform", "translate(" + padding+ ",0)")
        .call(yAxis);

    svg.append("line")
        .attr("class", "line halfMilMark")
        .attr("x1", padding)
        .attr("y1", yScale(500000))
        .attr("x2", w)
        .attr("y2", yScale(500000));
    
    svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed");

}           

