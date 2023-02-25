var w = 500;
var h = 200;
var offset = 3;
var padding = 100;

var dataset = [ 
    [5, 20], 
    [480, 90],  
    [250, 50],  
    [100, 33], 
    [330, 95], 
    [410, 12],  
    [475, 44],  
    [25, 67],  
    [85, 21],  
    [220, 88] 
    ];

var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d){
        return d[0];
    }),
    d3.max(dataset, function(d){
        return d[0];
    })])
    .range([padding, w - padding])

var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d){
        return d[1];
    }),
    d3.max(dataset, function(d){
        return d[1];
    })])
    .range([padding,h - padding])

var svg = d3.select("body")
    .data(dataset)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("outline", "solid thin skyblue");
               
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return xScale(d[0]) + padding;
    })
    .attr("cy", function(d){
        return yScale(d[1]) + padding;
    })
    .attr("r", 5)
    .attr("fill", function(d){
        if(d[0] == 250){
            return "red";
        }else{
            return "slategrey";
        }
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d){
        return xScale(d[0]) + offset + padding;
    })
    .attr("y", function(d){
        return yScale(d[1]) - offset + padding;
    })
    .style("font-style", "italic")
    .style("fill", d3.color("white"))
    .text(function(d){
        return d[0] + ", " + d[1];
    });