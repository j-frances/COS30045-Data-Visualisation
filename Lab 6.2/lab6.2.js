
/* 
    Generate initial values including a status tracker for
    the sort function as a global value. This ensures that 
    we can track whether the dataset is sorted in ascending or
    descending order.
*/
var w = 500;
var h = 400;
var sortStatus = "unsorted";
var padding = 100;
var dataset = [14, 5, 25, 23, 14];


/* 
    Create X and Y scales for the SVG based on the data provided
    in the dataset. These will be updated according to the changes
    made by each of the sort, add, and remove functions below.
*/
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding,w])
    .paddingInner(0.05);
    
var yScale = d3.scaleBand()
    .domain(d3.range(d3.max(dataset) + 1));


/* 
    The last value in the dataset is removed from the dataset and
    all other values within the SVG are updated so the graph fills
    the space in the same format as originally displayed.
*/
function removeValue(){
    dataset.pop();


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


/* 
    Generates a random value within the range of the graph and adds it
    to the dataset. The elements of the graph are then updated to accomodate
    the new dataset and a new column representing the data is generated.
    The new column must also have values set for the transition effects
    and colour scheme so that it matches the existing format.
*/
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

/* 
    Event listener for click event on the sort button.
    Allows easier management of function calls.
*/

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

/* 
    Generate the SVG, including adding the mouseover and colour 
    transition effects for each column.
*/
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


/* 
    Sort function to move the columns also sorts the dataset so that
    subsequent addition or removal of columns does not reset the view
    by calling a dataset that does not match the visual representation.
*/
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