var w = 500;
var h = 400;
var sortStatus = "unsorted";
var padding = 100;
var dataset = [14, 5, 25, 23, 14];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding,w])
    .paddingInner(0.05);
    
var yScale = d3.scaleBand()
    .domain(d3.range(d3.max(dataset) + 1));

function removeValue(){
    dataset.shift();


    var bars = svg.selectAll("rect")
        .data(dataset);
    

    bars.exit()
    .transition()
    .duration(500)
    .attr("x", function(d, i){
        return xScale(i);
    })
    .attr("y", function(d){
        return h - (h * yScale(d));
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d){
        return yScale(d);
    })
    .remove();

    xScale.domain(d3.range(dataset.length));

    bars
    .merge(bars)
    .transition()
    .duration(500)
    .attr("x", function(d, i){
        return xScale(i);
    })
    .attr("width", xScale.bandwidth());
}

function addRandomValue(type){

       
        var maxValue = 25;
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);

        console.log(dataset);

        xScale.domain(d3.range(dataset.length))
            .rangeRound([padding,w])
        var bars = svg.selectAll("rect")
            .data(dataset);

        bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", function(d, i){
            return xScale(i);
        })
        .attr("y", function(d){
            return h - (h * yScale(d));
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){
            return yScale(d);
        })

        svg.selectAll("rect")
            .data(dataset)
            .attr("x", function(d, i){
                return xScale(i);
            })
            .attr("width", xScale.bandwidth())
            .style("fill", d3.color("yellowgreen"))

            .on("mouseover", function(event, d){
                var offset = xScale.bandwidth() / 3
                var xPosition = parseFloat(d3.select(this).attr("x"))
                var yPosition = parseFloat(d3.select(this).attr("y"))

                svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + offset)
                .attr("y", yPosition + offset)
                .text(d)

                d3.select(this)
                    .transition()
                    .delay(function(d, i){
                        return i/dataset.length * 1000;
                    })
                    .style("fill", d3.color("orange"));
            })
            .on("mouseout", function(){
                d3.selectAll("#tooltip")
                    .remove()

                d3.select(this)
                    .transition()
                    .delay(function(d, i){
                        return i/dataset.length * 1000;
                    })
                    .style("fill", d3.color("yellowgreen"));
            })
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

d3.select("#sort")
    .on("click", function(){
        sortBars();
    })

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
    .style("fill", d3.color("yellowgreen"))
    .on("mouseover", function(event, d){
        var offset = xScale.bandwidth() / 3
        var xPosition = parseFloat(d3.select(this).attr("x"))
        var yPosition = parseFloat(d3.select(this).attr("y"))

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition + offset)
            .attr("y", yPosition + offset)
            .text(d);
        
        d3.select(this)
            .style("fill", d3.color("orange"));
    })
    .on("mouseout", function(){
        svg.selectAll("#tooltip")
            .remove()

        d3.select(this)
            .transition()
            .delay(function(d, i){
                return i/dataset.length * 1000;
            })
            .style("fill", d3.color("yellowgreen"))
    });

var sortBars = function(){
    if(sortStatus == "ascending"){
        svg.selectAll("rect")
        .data(dataset)
        .sort(function(a, b){
            return d3.descending(a, b);
        })
        .transition()
        .delay(function(d, i){
            return i/dataset.length * 1000;
        })
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
        sortStatus = "descending";
        dataset.sort((a,b) => b-a);
        console.log(dataset);
    }else{
        svg.selectAll("rect")
        .sort(function(a, b){
            return d3.ascending(a, b);
        })
        .transition()
        .delay(function(d, i){
            return i/dataset.length * 1000;
        })
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
        sortStatus = "ascending";
        dataset.sort((a,b) => a-b);
        console.log(dataset);
    }
}