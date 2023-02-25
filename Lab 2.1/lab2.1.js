var dataset = [14, 5, 26, 23, 9];

d3.select("body").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .style("color", function(d){
        if(d > 10){
            console.log("here");
            return d3.color("red");
        }else{
            return;
        }
    })
    .text(function(d){            
        msg = `Joe watched ${d} cat videos today.`;
        if(d > 10){
            return "Warning: " + msg;
        }else{
            return msg;
        }
    });