/**
 * Constructor for the Vote Percentage Chart
 */
 function GenderChart(){

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
GenderChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 20};

    // d3.select("#gender-chart")
    //     .append('h3')
    //     .attr('x', 10)
    //     .attr('y', 10)
    //     .text("Gender Distribution")

    d3.select("#originalGender")
                .append('h4')
                .attr('x', 10)
                .attr('y', 10)
                .attr('id', 'yeartext')

    var divPercentage = d3.select("#originalGender").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divPercentage.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 80;

    //creates svg element within the div
    self.svg = divPercentage.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
};


GenderChart.prototype.update = function(file){
    var self = this;


    var year = file.substring(5,9);
    d3.select("#originalGender").selectAll('#yeartext').text(year);

    d3.csv(file).then(function(data) {

        
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, self.svgWidth]);
    
    
        data[0].female = +data[0].female;
        data[0].male = +data[0].male;
        data[0].total = +data[0].total;
    
        var femalePercentage = data[0].female/data[0].total * 100;
        var malePercentage = data[0].male/data[0].total * 100;
    
        const f = d3.format(".1f");

        femalePercentage = f(femalePercentage);
        malePercentage = f(malePercentage);

        var data_for_graph = [];
        data_for_graph.push(f(femalePercentage));
        data_for_graph.push(f(malePercentage));
        

        var textFemalePercentage = f(femalePercentage) + "% (" + data[0].female +")";
        var textMalePercentage = f(malePercentage) + "% (" + data[0].male + ")";
    

        self.svg.selectAll('rect').remove();
        self.svg.selectAll('text').remove();
        self.svg.selectAll('line').remove();
    

        

        var tracker = 0;
        var ret_val2 = 0;


         data_for_graph.forEach(function(element) {
            
            var femaleIndicator = self.svg
                                .append("text")
                                .attr('x', 0)
                                .attr('y', 10)
                                .attr('class', "caption")
                                .text("Female");

            var maleIndicator = self.svg
                                .append("text")
                                .style("text-align", "right")
                                .style("text-anchor","end")
                                .attr('x', x(100))
                                .attr('y', 10)
                                .attr('class', "caption")
                                .text("Male");

            var bars = self.svg
                .append("rect")
                .attr("class", "percentage")
                // .attr({ry : (20), rx : 20 })
                .attr('rx', 5)
                .attr('ry', 0)
                .attr("y", 15)
                .attr("height", 60)
                .attr("x", function() {
                    ret_val = tracker;
                    tracker = tracker + x(element);
                    return ret_val;
                })
                .attr("width", x(element))
                .attr("id", function(d) {
                    if (ret_val2 == 0) {
                        ret_val2++;
                        return "femalePercentage";
                    }
                    else {
                        return "malePercentage";
                    }
                });

            var hoverTextFemale = self.svg.append("text")
                .attr('x', 5)
                .attr('y', 50)
                .attr('class', 'percentCaption')
                .style('opacity', 0)
                .style('fill', 'white')
                .text(textFemalePercentage);

            var hoverTextMale = self.svg.append("text")
                .style("text-align", "right")
                .style("text-anchor","end")
                .attr('x', x(100))
                .attr('y', 50)
                .attr('class', 'percentCaption')
                .attr('id', 'percentCaptionMale')
                .style('fill', 'white')
                .style('opacity', 0)
                .text(textMalePercentage);

            bars.transition()
                .duration(1000);

            bars.on("mouseover", function() {
                d3.select(this).style("cursor", "pointer"); 
               if (d3.select(this).attr('id') == "femalePercentage") {
                d3.select(this).style("fill", "#FF69B4");
                hoverTextFemale.style('opacity', 1);
               }
               else {
                d3.select(this).style("fill", "#4682B4");
                hoverTextMale.style('opacity', 1);
               }
            })
            .on("mouseout", function() {
                d3.select(this).style("cursor", "default"); 
                if (d3.select(this).attr('id') == "femalePercentage") {
                    d3.select(this).style("fill", "pink");
                    hoverTextFemale.style('opacity', 0);
               }
               else {
                d3.select(this).style("fill", "lightskyblue");
                hoverTextMale.style('opacity', 0);
               }
                
            })


            
        });

        
       
    
    })
    
    


};
