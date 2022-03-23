/**
 * Constructor for the Comparing with different Olympics
 */
 function CompareOther(){

    var self = this;
    self.init();

};

/**
 * Initializes the svg elements required for this chart
 */
CompareOther.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 20};

    d3.select("#compare")
        .append('h2')
        .attr('x', 10)
        .attr('y', 10)
        .text("Compare With Other Olympics (Gender Distribution and Gold Medal Ranking)")


    var divCompare = d3.select("#compare").classed("content", true);
    var divDropDown = d3.select("#compare").append('div').attr('id', 'dropdown_container');

  
};




CompareOther.prototype.update = function(file){
    var self = this;

    d3.csv(file).then(function(data) {

        console.log(data);
        var countriesByName = d3.nest()
        .key(function(d) {
            return d.Year + " " + d.City;
            })
        .entries(data);

        var data = JSON.stringify(countriesByName);
        var data = JSON.parse(data);
        console.log(data);

        d3.selectAll('select').remove();
      
            var country = [];
            for (var i in data) {
              country.push(data[i].key);
            };

            var dropDown = d3.select("#dropdown_container")
              .append("select")
              .attr("class", "selection")
              .attr("name", "country-list")
              .attr("id", "select-olympic");

            var options = dropDown.selectAll("option")
              .data(data)
              .enter()
              .append("option");

            options.text(function(d) {
                return d.key;
              })
              .attr("value", function(d) {
                return d.values[0].Year;
              });

        dropDown.on("change", function() {
            var selected = d3.select("#select-olympic").node().value;
            console.log( selected );


            function compareGenderChart(file, year) {
                d3.selectAll(".compareSVG-gender").remove();

                genderMargin = {top: 30, right: 20, bottom: 30, left: 50};

                d3.selectAll('.compareText-gender').remove();

                d3.select("#comparedGender")
                    .append('h4')
                    .attr('x', 100)
                    .attr('y', 10)
                    .attr('class', 'compareText-gender')
                    .text(selected)

                var gendersChart = d3.select("#comparedGender").classed("content", true);

                //Gets access to the div element created for this chart from HTML
                svgBoundsG = gendersChart.node().getBoundingClientRect();
                svgWidthG = svgBoundsG.width - genderMargin.left - genderMargin.right;
                svgHeightG = 80;

                //creates svg element within the div
                genderSvg = gendersChart.append("svg")
                    .attr("width",svgWidthG)
                    .attr("height",svgHeightG)
                    .attr("class", "compareSVG-gender")

                d3.csv(file).then(function(data) {
                    d3.select('genderSvg').selectAll('rect').remove();
                    d3.select('genderSvg').selectAll('text').remove();



                    var x = d3.scaleLinear()
                        .domain([0, 100])
                        .range([0, svgWidthG]);
                
                
                    data[0].female = +data[0].female;
                    data[0].male = +data[0].male;
                    data[0].total = +data[0].total;
                
                    var femalePercentage = data[0].female/data[0].total * 100;
                    var malePercentage = data[0].male/data[0].total * 100;
                
                    const f = d3.format(".1f");
                
                    var data_for_graph = [];
                    data_for_graph.push(f(femalePercentage));
                    data_for_graph.push(f(malePercentage));
                
                    
                    var textFemalePercentage = f(femalePercentage) + "% (" + data[0].female +")";
                    var textMalePercentage = f(malePercentage) + "% (" + data[0].male + ")";

                    genderSvg.selectAll('rect').remove();
                    genderSvg.selectAll('text').remove();
                    genderSvg.selectAll('line').remove();

                    var tracker = 0;
                    var ret_val2 = 0;



                     data_for_graph.forEach(function(element) {
                    

                        var femaleIndicator = genderSvg
                                .append("text")
                                .attr('x', 0)
                                .attr('y', 10)
                                .attr('class', "caption")
                                .text("Female");

                        var maleIndicator = genderSvg
                                            .append("text")
                                            .style("text-align", "right")
                                            .style("text-anchor","end")
                                            .attr('x', x(100))
                                            .attr('y', 10)
                                            .attr('class', "caption")
                                            .text("Male");


                        var bars = genderSvg
                            .append("rect")
                            .attr("class", "percentage")
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
                            })
                            .style('z-index', 0);

                        var hoverTextFemale = genderSvg.append("text")
                            .attr('x', 5)
                            .attr('y', 50)
                            .attr('class', 'percentCaption')
                            .style('opacity', 0)
                            .style('fill', 'white')
                            .style('z-index', 9999)
                            .text(textFemalePercentage);

                        var hoverTextMale = genderSvg.append("text")
                            .style("text-align", "right")
                            .style("text-anchor","end")
                            .attr('x', x(100))
                            .attr('y', 50)
                            .attr('class', 'percentCaption')
                            .style("text-anchor", "right")
                            .style('fill', 'white')
                            .style('opacity', 0)
                            .style('z-index', 10)
                            .text(textMalePercentage);

                        bars.transition()
                            .duration(1000);

                        bars.on("mouseover", function() {
                            d3.select(this).style("cursor", "pointer"); 
                           if (d3.select(this).attr('id') == "femalePercentage") {
                            d3.select(this).style("fill", "#FF69B4");
                            hoverTextFemale.style('opacity', 1);                           }
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

                




            }

            function compareMedalChart(file, year) {
                d3.selectAll(".compareSVG").remove();


                var medalsMargin = {top: 30, right: 20, bottom: 30, left: 50};
                

                d3.selectAll('.compareText-medal').remove();

                d3.select("#comparedMedal")
                    .append('h4')
                    .attr('x', 100)
                    .attr('y', 10)
                    .attr('class', 'compareText-medal')
                    .text(selected)


                var medalsChart = d3.select("#comparedMedal").classed("content", true);

                var svgBoundsM = medalsChart .node().getBoundingClientRect();
                var svgWidthM = svgBoundsM.width - medalsMargin.left - medalsMargin.right;
                var svgHeightM = 500;


                medalSvg = medalsChart.append("svg")
                    .attr("width", svgWidthM)
                    .attr("height", svgHeightM)
                    .attr("class", "compareSVG")



                d3.select('medalSvg').selectAll('rect').remove();
                d3.select('medalSvg').selectAll('text').remove();

                medalSvg.append('h3').text("Top 10 Gold Medals For: " + year);


                d3.csv(file).then(function(data) {
                    console.log(data);
                    medalSvg.selectAll('rect').remove();
                    medalSvg.selectAll('text').remove();


                    var x = d3.scaleLinear()
                        .domain([0, 100])
                        .range([0, svgWidthM]);
                
                    medalSvg.selectAll('rect')
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr('rx', 8)
                        .attr("y", function(d,i) {
                            return (i ) * 40
                        })
                        .attr("height", 30)
                        .transition()
                        .duration(1000)
                        .attr("x", 20)
                        .attr("width", function(d, i) {
                            d.Gold = +d.Gold;
                            return x(d.Gold);
                        })
                        .attr("class", "medal-bars")
                


                    var medalText = medalSvg
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


                    var medalTextCountry = medalSvg
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

                     medalSvg.selectAll('rect').on("mouseover", function() {
                            d3.select(this).style("cursor", "pointer"); 
                           medalSvg.selectAll('.medalText').style('opacity', 1);
                        })
                        .on("mouseout", function() {
                            d3.select(this).style("cursor", "default"); 
                           medalSvg.selectAll('.medalText').style('opacity', 0);
                            
                        })

                })
            }
            compareMedalChart('./data/'+selected+'/'+selected+'-top10.csv', selected);
            compareGenderChart('./data/'+selected+'/'+selected+'-gender.csv', selected);
        })

    })


    
    


};
