var w = 1000;
var h = 1000;
var padding = 25;

var outerRadius = w / 2;
var innerRadius = 0;

var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var pie = d3.pie();

var color = d3.scaleOrdinal(d3.schemeCategory10);

var dataset = [];

for(var i = 0; i < 10;i++){
    var min = 1;
    var max = 25;
    var newNumber = Math.floor(Math.random() * (max - min) + min);
    dataset.push(newNumber);    
}

console.table(dataset);

var svg = d3.select("p")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var arcs = svg.selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate( " + outerRadius + ", " + outerRadius + ")");

arcs.append("path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function(d, i){
        return arc(d, i);
    })

arcs.append("text")
    .text(function(d){
        return d.value;
    })
    .attr("transform", function(d){
        return "translate(" + arc.centroid(d) + ")";
    })