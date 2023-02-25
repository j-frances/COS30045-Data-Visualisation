var w = 1000;
var h = 500;
var padding = 10;

function barChart(data){
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w / data.length);
        })
        .attr("y", function(d){
            return h - (d.wombats * 4);
        })
        .attr("width", (w / data.length) - padding)
        .attr("height", function(d){
            return d.wombats * 4;
        })
        .style("fill", function(d){
            if(d.wombats < 10){
                return d3.color("blue");
            }else{
                return d3.color("darkblue");
            }
        });
}           

d3.csv("res/Task_2.4_data.csv").then(function(data){
    console.log(data);
    wombatSightings = data;
    barChart(wombatSightings);
});

var svg = d3.select("p")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("outline", "solid thin skyblue");