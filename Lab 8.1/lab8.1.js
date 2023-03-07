var w = 1000;
var h = 1000;
var padding = 25;

var yScale = d3.scaleLinear()
    .domain([0, h])
    .range([h, 0]);

var xScale = d3.scaleBand()
    .domain(d3.range(w))
    .rangeRound([padding,w])
    .paddingInner(0.05);

var projection = d3.geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("p")
    .append("svg")
    .attr("width", w + padding)
    .attr("height", h + padding)
    .attr("fill", "grey");

d3.json("res/LGA_VIC.json").then(function(json){
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append()
        .attr("x", function(d, i){
            return xScale(i);
        })
        .attr("y", function(d, i){
            return yScale(d[1]);
        })
        .attr("d", path);
})