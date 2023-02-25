var w = 500;
var h = 200;

var padding = 10;

var dataset = [14, 5, 26, 23, 9];

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", d3.color("skyblue"));
   

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return i * (w / dataset.length) + padding;
    })
    .attr("y", function(d){
        return 100 + (100 - (d * 4));
    })
    .attr("width", (w / dataset.length) - padding)
    .attr("height", function(d){
        return d * 4;
    })
    .style("fill", d3.color("yellowgreen"));