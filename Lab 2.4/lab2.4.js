/*
    We define some values to be used for the svg element
    and the columns of the bar chart here so that they can
    be edited more easily if we want to change the appearance
    of the graph in the future.
*/
var w = 1000;
var h = 500;
var padding = 10;


/*
    Bar chart used to represent the CSV data. For each rectangle we define:
        - X attribute spaces the columns along the x axis.
        - Y attribute moves the origin of each column relative to 0,0 (top left of the svg).
        - Height attribute determined by the CSV data, scaled times 4 for readability.
        - Width attribute is scaled so that all columns are equal and include spacing.
*/
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

/*
    We load the csv data and save it to a variable "wombatSightings".
    We pass this variable to the barChart function to generate the graph.
*/
d3.csv("res/Task_2.4_data.csv").then(function(data){
    console.log(data);
    wombatSightings = data;
    barChart(wombatSightings);
});


/*
    We set up the svg canvas according to predefined width and height
    The svg is appended to a paragraph element so that we can control 
    where it renders on the page.
*/
var svg = d3.select("p")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("outline", "solid thin skyblue");