/**
 * Constructor for the Year-Cities Chart
 *
 * @param electoralVoteChart instance of ElectoralVoteChart
 * @param tileChart instance of TileChart
 * @param votePercentageChart instance of Vote Percentage Chart
 * @param electionInfo instance of ElectionInfo
 * @param electionWinners data corresponding to the winning parties over mutiple election years
 */
 function YearCitiesChart(countryMapChart, infochart, medalChart, genderChart,cities) {
    var self = this;
    self.cities = cities;
    self.map = countryMapChart;
    self.infochart = infochart;
    self.medalChart = medalChart;
    self.genderChart = genderChart;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
YearCitiesChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;

    svg = divyearChart.append("svg")
    .attr("width",self.svgWidth)
    .attr("height",self.svgHeight)


};

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearCitiesChart.prototype.update = function(){
    var self = this;
    var clicked = null;
    console.log(self.cities);
    // //Domain definition for global color scale
    // var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];

    // //Color range for global color scale
    // var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

    // //Global colorScale to be used consistently by all the charts
    // self.colorScale = d3.scaleQuantile()
    //     .domain(domain).range(range);
    
    var x = d3.scaleLinear()
    .domain([0, self.cities.length])
    .range([0, self.svgWidth]);
    

  var svg = d3.select('#year-chart')
					.selectAll('svg');

	svg.selectAll('circle')
          .data(self.cities)
          .enter()
          .append('circle')
          .attr('r', 20)
          .attr('cx', function(d, i) {
          	if (d.Year < 1900) {
          		return x(i) + 1 * 100;
          	}
          	else if (d.Year < 2000) {
          		var index = (d.Year - 1900)/4
          		return x(index) + 1 * 100;
          	}
          	else {
          		var index = (d.Year - 2000)/4
          		return x(index) + 1 * 100;
          	}
            
          })
          .attr('cy', function(d, i) {
          	d.Year = +d.Year;
          	if (d.Year < 1900) {
          		return 20;
          	}
          	else if  (d.Year < 2000) {
          		return 100;
          	}
          	else {
          		return 180;
          	}
          })
          .attr('fill','lightgrey')
          .on('mouseover', function(d,i){
            d3.select(this).attr('fill','pink')
            svg.append('text').attr('class','tooltip').attr('x',function(d, i) {
                return 800;
              
            })
            .attr('y', 20)
            .text(i.City)
          })
          .on('mouseout', function(d,i){
            d3.select(this).attr('fill','lightgrey')
            d3.select('.tooltip').remove()
          })
          .on('click', function(d, i) {
            //   d3.selectAll('circle')
            //     .attr('class', function(d) {
            //        return self.chooseClass(d.PARTY);
            //     });
            //     d3.select(event.currentTarget)
            //       .attr('class','highlighted')
                if(i.Year == 2016){
                    self.map.update('data/'+i.Year+'/'+i.Year+'-athleteCountByCountry.csv');
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                    // self.tileChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                    // self.votePercentageChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                }
                else{
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                }

        });
    svg.selectAll('text')
        .data(self.cities)
        .enter()
        .append('text')
        .attr('x', function(d, i) {
            if (d.Year < 1900) {
                return x(i) + 1 * 90;
            }
            else if (d.Year < 2000) {
                var index = (d.Year - 1900)/4
                return x(index) + 1 * 90;
            }
            else {
                var index = (d.Year - 2000)/4
                return x(index) + 1 * 90;
            }
          
        })
        .attr('y', function(d, i) {
            d.Year = +d.Year;
            if (d.Year < 1900) {
                return 25;
            }
            else if  (d.Year < 2000) {
                return 65;
            }
            else {
                return 105;
            }
        })
        .text(function(d,i){
            if (d.Year < 1900) {
                return "'"+(d.Year-1800);
            }
            else if (d.Year < 2000) {
                return "'"+(d.Year-1900);
            }
            else {
                return "'"+(d.Year-2000);
            }

        })
        .attr('class', 'noSelect')
        .on('click', function(d, i) {
            //   d3.selectAll('circle')
            //     .attr('class', function(d) {
            //        return self.chooseClass(d.PARTY);
            //     });
            //     d3.select(event.currentTarget)
            //       .attr('class','highlighted')
                if(i.Year == 2016 ||i.Year == 2020 ){
                    self.map.update('data/'+i.Year+'/'+i.Year+'-athleteCountByCountry.csv');
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                    // self.tileChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                    // self.votePercentageChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                }

        });
        
    // svg.selectAll('text')
    //     .data(self.cities)
    //     .enter()
    //     .append('text')
    //     .attr('x', function(d, i) {
    //         if (d.Year < 1900) {
    //             return x(i) + 1 * 100;
    //         }
    //         else if (d.Year < 2000) {
    //             var index = (d.Year - 1900)/4
    //             return x(index) + 1 * 100;
    //         }
    //         else {
    //             var index = (d.Year - 2000)/4
    //             return x(index) + 1 * 100;
    //         }
          
    //     })
    //     .attr('y', function(d, i) {
    //         d.Year = +d.Year;
    //         if (d.Year < 1900) {
    //             return 40;
    //         }
    //         else if  (d.Year < 2000) {
    //             return 80;
    //         }
    //         else {
    //             return 120;
    //         }
    //     })
    //     .text(function(d,i){
    //         console.log
    //         return d.City;
    //     })
    svg.append('text')
    .attr('x',20)
    .attr('y',25)
    .text('1800s');
    svg.append('text')
    .attr('x',20)
    .attr('y',65)
    .text('1900s');
    svg.append('text')
    .attr('x',20)
    .attr('y',105)
    .text('2000s');
};





/**
 * Constructor for the Year-Cities Chart
 *
 * @param electoralVoteChart instance of ElectoralVoteChart
 * @param tileChart instance of TileChart
 * @param votePercentageChart instance of Vote Percentage Chart
 * @param electionInfo instance of ElectionInfo
 * @param electionWinners data corresponding to the winning parties over mutiple election years
 */
 function YearCitiesChart(countryMapChart, infochart, medalChart, genderChart,cities) {
    var self = this;
    self.cities = cities;
    self.map = countryMapChart;
    self.infochart = infochart;
    self.medalChart = medalChart;
    self.genderChart = genderChart;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
YearCitiesChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;

    svg = divyearChart.append("svg")
    .attr("width",self.svgWidth)
    .attr("height",self.svgHeight)


};

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearCitiesChart.prototype.update = function(){
    var self = this;
    var clicked = null;
    console.log(self.cities);

    var x = d3.scaleLinear()
    .domain([0, self.cities.length])
    .range([0, self.svgWidth]);
    

  var svg = d3.select('#year-chart')
					.selectAll('svg');

	svg.selectAll('rect')
          .data(self.cities)
          .enter()
          .append('rect')
          .attr('x', function(d, i) {
          	if (d.Year < 1900) {
          		return x(i) + 1 * 100;
          	}
          	else if (d.Year < 2000) {
          		var index = (d.Year - 1900)/4
          		return x(index) + 1 * 100;
          	}
          	else {
          		var index = (d.Year - 2000)/4
          		return x(index) + 1 * 100;
          	}
            
          })
          .attr('width', function(d, i) {
            if (d.Year < 1900) {
                return x(i);
            }
            else if (d.Year < 2000) {
                var index = (d.Year - 1900)/4
                return x(index);
            }
            else {
                var index = (d.Year - 2000)/4
                return x(index);
            }
          
        })
          .attr('y', function(d, i) {
          	d.Year = +d.Year;
          	if (d.Year < 1900) {
          		return 20;
          	}
          	else if  (d.Year < 2000) {
          		return 60;
          	}
          	else {
          		return 100;
          	}
          })
          .attr('height',40)
          .attr('fill','lightgrey')
          .on('mouseover', function(d,i){
            d3.select(this).attr('fill','pink')
            svg.append('text').attr('class','tooltip').attr('x',function(d, i) {
                return 800;
              
            })
            .attr('y', 20)
            .text(i.City)
          })
          .on('mouseout', function(d,i){
            d3.select(this).attr('fill','lightgrey')
            d3.select('.tooltip').remove()
          })
          .on('click', function(d, i) {
            //   d3.selectAll('circle')
            //     .attr('class', function(d) {
            //        return self.chooseClass(d.PARTY);
            //     });
            //     d3.select(event.currentTarget)
            //       .attr('class','highlighted')
                if(i.Year == 2016){
                    self.map.update('data/'+i.Year+'/'+i.Year+'-athleteCountByCountry.csv');
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                    // self.tileChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                    // self.votePercentageChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                }
                else{
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                }

        });
    svg.selectAll('text')
        .data(self.cities)
        .enter()
        .append('text')
        .attr('x', function(d, i) {
            if (d.Year < 1900) {
                return x(i) + 1 * 90;
            }
            else if (d.Year < 2000) {
                var index = (d.Year - 1900)/4
                return x(index) + 1 * 90;
            }
            else {
                var index = (d.Year - 2000)/4
                return x(index) + 1 * 90;
            }
          
        })
        .attr('y', function(d, i) {
            d.Year = +d.Year;
            if (d.Year < 1900) {
                return 25;
            }
            else if  (d.Year < 2000) {
                return 65;
            }
            else {
                return 105;
            }
        })
        .text(function(d,i){
            if (d.Year < 1900) {
                return "'"+(d.Year-1800);
            }
            else if (d.Year < 2000) {
                return "'"+(d.Year-1900);
            }
            else {
                return "'"+(d.Year-2000);
            }

        })
        .attr('class', 'noSelect')
        .on('click', function(d, i) {
            //   d3.selectAll('circle')
            //     .attr('class', function(d) {
            //        return self.chooseClass(d.PARTY);
            //     });
            //     d3.select(event.currentTarget)
            //       .attr('class','highlighted')
                if(i.Year == 2016 ||i.Year == 2020 ){
                    self.map.update('data/'+i.Year+'/'+i.Year+'-athleteCountByCountry.csv');
                    self.genderChart.update('data/'+i.Year+'/'+i.Year+'-gender.csv');
                    self.medalChart.update('data/'+i.Year+'/'+i.Year+'-top10.csv');
                    // self.tileChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                    // self.votePercentageChart.update('data/election-results-'+i.YEAR+'.csv', self.colorScale);
                }

        });
        
    // svg.selectAll('text')
    //     .data(self.cities)
    //     .enter()
    //     .append('text')
    //     .attr('x', function(d, i) {
    //         if (d.Year < 1900) {
    //             return x(i) + 1 * 100;
    //         }
    //         else if (d.Year < 2000) {
    //             var index = (d.Year - 1900)/4
    //             return x(index) + 1 * 100;
    //         }
    //         else {
    //             var index = (d.Year - 2000)/4
    //             return x(index) + 1 * 100;
    //         }
          
    //     })
    //     .attr('y', function(d, i) {
    //         d.Year = +d.Year;
    //         if (d.Year < 1900) {
    //             return 40;
    //         }
    //         else if  (d.Year < 2000) {
    //             return 80;
    //         }
    //         else {
    //             return 120;
    //         }
    //     })
    //     .text(function(d,i){
    //         console.log
    //         return d.City;
    //     })
    svg.append('text')
    .attr('x',20)
    .attr('y',25)
    .text('1800s');
    svg.append('text')
    .attr('x',20)
    .attr('y',65)
    .text('1900s');
    svg.append('text')
    .attr('x',20)
    .attr('y',105)
    .text('2000s');
};
