var offset = 3;
var padding = 100;
var max_x = 0;
var max_y = 0;

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

// Find the largest X and Y values to draw the SVG area around
for(var i = 0; i < dataset.length; i++){
    
    if(max_x < dataset[i][0]){
        max_x = dataset[i][0];
    }
    
    if(max_y < dataset[i][1]){
        max_y = dataset[i][1];
    }
}

var svg = d3.select("body")
    .data(dataset)
    .append("svg")
    .attr("width", max_x + padding * 3)
    .attr("height", max_y + padding * 3)
    .style("outline", "solid thin skyblue");
               
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return d[0] + padding;
    })
    .attr("cy", function(d){
        return d[1] + padding;
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
        return d[0] + offset + padding;
    })
    .attr("y", function(d){
        return d[1] - offset + padding;
    })
    .style("font-style", "italic")
    .style("fill", d3.color("white"))
    .text(function(d){
        return d[0] + ", " + d[1];
    });