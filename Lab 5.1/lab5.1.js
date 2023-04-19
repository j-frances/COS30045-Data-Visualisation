var w = 500;
var h = 500;

var padding = 100;

var dataset = [14, 5, 25, 23];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding,w])
    .paddingInner(0.05);
    
var yScale = d3.scaleBand()
    .domain(d3.range(0, d3.max(dataset)));

var btn = d3.select("button")
    .on("click", function(){
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
                console.log(xScale(i));
                return xScale(i) + (xScale(0) / 2);
            })
            .attr("y", h - 20)
            .attr("dy", ".75em")
            .text(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .attr("y", function(d){
                return h - (h * yScale(d));
            })
            .attr("height", function(d){
                return (d * (h / yScale.bandwidth()));
            })

    })

var svg = d3.select("body")
    .append("svg")
    .attr("width", w + padding)
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
        return (d * (h / yScale.bandwidth()));
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