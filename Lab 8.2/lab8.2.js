var w = 1000;
var h = 1000;
var padding = 25;

var color = d3.scaleOrdinal()
    .range(['#004c6d','#41768e','#75a3b1','#acd0d6','#e7ffff']);

    
var projection = d3.geoMercator()
    .center([145,-36])
    .translate([w / 2, h / 2])
    .scale(5000);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("p")
    .append("svg")
    .attr("width", w + padding)
    .attr("height", h + padding);

d3.csv("res/VIC_LGA_unemployment.csv", function(d){
    return {
        LGA: +d.LGA,
        unemployed: +d.unemployed
    };
}).then(function(data){

    d3.json("res/LGA_VIC.json").then(function(json){

        for(var i = 0; i < data.length; i++){
            
            var dataState = data[i].LGA;

            var dataValue = parseFloat(data[i].unemployed);

            for(var j = 0; j < json.features.length; j++){
                
                var jsonState = json.features[j].properties.LGA_name;

                if(dataState == jsonState){

                    json.features[j].properties.value = dataValue;

                    break;
                }
            }
        }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("stroke", "dimgray")
            .attr("fill", function(d, i) {return color(i)})
            .attr("d", path);
    });
});

d3.csv("res/VIC_city.csv", function(d){
    return {
        city: +d.place,
        lat: +d.lat,
        long: +d.lon
    }
}).then(function(data){

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return projection([d.long, d.lat])[0];
    })
    .attr("cy", function(d, i){
        console.log(projection([d.long, d.lat]));
        return projection([d.long, d.lat])[0];
    })
    .attr("r", 5);

    svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("cx", function(d){
        return projection([d.long, d.lat][0]);
    })
    .attr("cy", function(d){
        return projection([d.long, d.lat][0]);
    })
    .style("font-style", "italic")
    .style("fill", d3.color("yellow"))
    .text(function(d){
        return d.city;
    });
});


