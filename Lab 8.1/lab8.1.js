var w = 1000;
var h = 1000;
var padding = 25;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var projection = d3.geoMercator()
    .center([145,-36])
    .translate([w / 2, h / 2])
    .scale(1000);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("p")
    .append("svg")
    .attr("width", w + padding)
    .attr("height", h + padding);

d3.json("res/LGA_VIC.json").then(function(json){

    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("stroke", "dimgray")
        .attr("fill", function(d, i) {return color(i)})
        .attr("d", path);
});