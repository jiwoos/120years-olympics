/**
 * Constructor for the medal Count Chart
 */
 function MedalChart(){

    var self = this;
    self.init();
};
 
/**
 * Initializes the svg elements required for this chart
 */
MedalChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};
    
    // d3.select("#medal-rankings")
    //     .append('h3')
    //     .attr('x', 10)
    //     .attr('y', 10)
    //     .text("Top 10 Gold Medal Countries")

    d3.select("#originalMedal")
                .append('h4')
                .attr('x', 10)
                .attr('y', 10)
                .attr('id', 'yeartext-medal')


    var medalsChart = d3.select("#originalMedal").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = medalsChart .node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 400;

    //creates svg element within the div
    self.svg = medalsChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

};


MedalChart.prototype.update = function(file){
    var self = this;
    
    var year = file.substring(5,9);
    d3.select("#originalMedal").selectAll('#yeartext-medal').text(year);

    d3.csv(file).then(function(data) {

        self.svg.selectAll('rect').remove();
        self.svg.selectAll('text').remove();

        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, self.svgWidth]);
    
            // append the text h2 to let audience know it represents # of golds
      


        var medalBars = self.svg.selectAll('rect')
            .data(data)
            .enter()
            .append("rect")
            .attr('rx', 8)
            .attr("y", function(d,i) {
                return (i) * 40
            })
            .attr("height", 30)
            .transition()
            .duration(1000)
            .attr("x", 20)
            .attr("width", function(d, i) {
                d.Gold = +d.Gold;
                return x(d.Gold);
            })
            .attr("class", "medal-bars");

        var medalText = self.svg
            .append('g');

        medalText.selectAll('text')
            .data(data)
            .enter()
            .append("text")
            .style('opacity', 0)
            .attr('class', 'medalText')
            .attr("y", function(d,i) {
                return (i +1) * 40 - 20;
            })
            .transition()
            .duration(1000)
            .attr("x", function(d) {
                return 25;
            })
            .text(function(d) {
                return d.Gold;
            });


        var medalTextCountry = self.svg
            .append('g');
            
        medalTextCountry.selectAll('text')
            .data(data)
            .enter()
            .append("text")
            .attr("y", function(d,i) {
                return (i +1) * 40 - 20;
            })
            .transition()
            .duration(1000)
            .attr("x", function(d) {
                return x(d.Gold) + 30;
            })
            .text(function(d) {
                return d.Team;
            });

         self.svg.selectAll('rect').on("mouseover", function() {
                d3.select(this).style("cursor", "pointer"); 
                self.svg.selectAll('.medalText').style('opacity', 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("cursor", "default"); 
                self.svg.selectAll('.medalText').style('opacity', 0);
                
            })

    
    })


    
};