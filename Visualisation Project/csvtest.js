
var w = 1000;
var h = 1000;
var padding = 10;

var csv_file = "Net Overseas Migration by Visa Category (2004-2005).csv";
var NSWData = [];

function barChart(data){

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w / data.length);
        })
        .attr("y", function(d, i){
            return h - (parseInt(data[i].NOMarrivals) / 200);
        })
        .attr("width", (w / data.length) - padding)
        .attr("height", function(d, i){
            return parseInt(data[i].NOMarrivals) / 200;
        })
        .style("fill", function(d, i){
            if(data[i].NOMarrivals < 10000){
                return d3.color("blue");
            }else{
                return d3.color("darkblue");
            }
        });
}      


var svg = d3.select("p")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("outline", "solid thin skyblue");


d3.csv(csv_file).then(function(data){
    for(var i = 0; i < data.length; i++){
        if(data[i].State == "New South Wales"){
            NSWData.push(data[i]);
        }
    }

    barChart(NSWData);
});


    