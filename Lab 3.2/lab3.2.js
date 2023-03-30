var w = 1000;
var h = 1000;
var padding = 100;

/* 
    Initialise the data set of X and Y values.
*/
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

/* 
    We first set up a scale for the X and Y axis to use.
    We use D3 functions to get the min and max of the domain (data values).
    We also establish the range within our SVG for the axes to be rendered.
*/
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



/* 
    We then initialise the D3 axis object and assign the scale we just created.
*/
var xAxis = d3.axisBottom()
    .ticks(5)
    .scale(xScale);

var yAxis = d3.axisLeft()
    .ticks(5)
    .scale(yScale);


/* 
    Initialise the main SVG canvas.
 */
var svg = d3.select("body")
    .data(dataset)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("outline", "solid thin skyblue");
           
    
/* 
    We use the datapoints from our dataset to draw circles for our data.
    The dataset is provided by d and we access the first (0) and second (1) elements
    which represent the X and Y coordinates respectively.
*/
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return xScale(d[0]);
    })
    .attr("cy", function(d){
        return yScale(d[1]);
    })
    .attr("r", 5)
    .attr("fill", function(d){
        if(d[0] == 250){
            return "red";
        }else{
            return "slategrey";
        }
    });


/* 
    We also use the datapoints to map the text descriptions of the coordinates.
*/
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d){
        return xScale(d[0]);
    })
    .attr("y", function(d){
        return yScale(d[1]);
    })
    .style("font-style", "italic")
    .style("fill", d3.color("white"))
    .text(function(d){
        return d[0] + ", " + d[1];
    });


/* 
    Finally we append the axes to our svg with appropriate transformation.
    Without the padding to shift the axes they appear on the outer edges of the svg.
*/
svg.append("g")
.attr("transform", "translate(0, "+(w - padding) +")")
.call(xAxis);

svg.append("g")
.attr("transform", "translate(" + padding+ ","+(0) +")")
.call(yAxis);