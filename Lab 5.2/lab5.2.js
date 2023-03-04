var w = 500;
var h = 400;

var padding = 100;

var dataset = [14, 5, 25, 23, 14];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding,w])
    .paddingInner(0.05);
    
var yScale = d3.scaleBand()
    .domain(d3.range(d3.max(dataset) + 1));


function updateValues(type){
        var numValues = dataset.length;

        svg.selectAll(".x_label").remove();

        dataset = [];
        
        var maxValue = 25;

        for(var i = 0; i < numValues; i++){
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);

            svg.append("text")
            .data(dataset)
            .attr("class", "x_label")
            .attr("text-anchor", "start")
            .attr("x", function(d){
                return xScale(i) + (xScale(0) / 2);
            })
            .attr("y", h - 20)
            .attr("dy", ".75em")
            .text(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i){
                return i/dataset.length * 1000;
            })
            .duration(function(){
                switch(type){
                    case "default":
                        console.log(type);
                        return 3500;
                    case "slow":
                        return 10000;
                    case "fast":
                        return 1000;
                }
            })
            .ease(d3.easeElasticOut)
            .attr("y", function(d){
                return h - (h * yScale(d));
            })
            .attr("height", function(d){
                return (d * (h * yScale.bandwidth()));
            })
}

var svg = d3.select("body")
    .append("svg")
    .attr("width", w + 100)
    .attr("height", h)
    .style("background-color", d3.color("skyblue"));

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("x", -h / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("life expectancy (years)");

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
        return xScale(i);
    })
    .attr("y", function(d){
        return h - (h * yScale(d));
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d){
        return (d * (h * yScale.bandwidth()));
    })
    .style("fill", d3.color("yellowgreen"));

for(var i = 0; i < dataset.length; i++){
    svg.append("text")
    .data(dataset)
    .attr("class", "x_label")
    .attr("text-anchor", "start")
    .attr("x", xScale(i) + (xScale(0) / 2))
    .attr("y", h - 20)
    .attr("dy", ".75em")
    .text(dataset[i]);
}