/**
 * Constructor for the Year-Cities Chart
 *
 * @param medalChart data corresponding to the medal count rankings each olympics
 */
//function YearCitiesChart(countryMapChart, infochart, medalChart, genderChart, cities,compareOther) {
function YearCitiesChart(countryMapChart, medalChart, genderChart, cities,compareOther) {
    var self = this;
    self.cities = cities;
    self.map = countryMapChart;
    self.medalChart = medalChart;
    self.genderChart = genderChart;
    self.compareOther = compareOther;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
YearCitiesChart.prototype.init = function () {

    var self = this;
    self.margin = { top: 10, right: 20, bottom: 30, left: 50 };
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;

    svg = divyearChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)


};

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearCitiesChart.prototype.update = function () {
    
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
        .attr("id", function(d) {
            return d.Year +" rect";
        })
        .attr('x', function (d, i) {
            if (d.Year < 1900) {
                return x(i) + 1 * 80;
            }
            else if (d.Year < 2000) {
                var index = (d.Year - 1900) / 4
                return x(index) + 1 * 80;
            }
            else {
                var index = (d.Year - 2000) / 4
                return x(index) + 1 * 80;
            }

        })
        .attr('width', 40)
        .attr('y', function (d, i) {
            d.Year = +d.Year;
            if (d.Year < 1900) {
                return 5;
            }
            else if (d.Year < 2000) {
                return 55;
            }
            else {
                return 105;
            }
        })
        .attr('height', 40)
        .attr('rx','10')
        .attr('fill', 'lightgrey')
        .on('mouseover', function (d, i) {
            d3.select(this).attr('fill', 'pink');
            d3.select(this).style("cursor", "pointer"); 
            svg.append('text').attr('class', 'tooltip').attr('x', function (d, i) {
                return self.svgWidth - 300;

            })
                .attr('y', 20)
                .attr('font-size',25)
                .text(i.City)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).style("cursor", "default"); 
            d3.select(this).attr('fill', 'lightgrey')
            d3.select('.tooltip').remove()
        })
        .on('click', function (d, i) {
            svg.selectAll('rect').style('stroke', 'none');
            d3.select(this).style('stroke', 'pink');
            d3.select(this).style("stroke-width", 5);
            console.log(i.City)

            if (i.Year == 2016|| i.Year ==2020) {
                self.map.update(i.Year,i.City,'data/' + i.Year + '/' + i.Year + '-athleteCountByCountry.csv');
                self.genderChart.update('data/' + i.Year + '/' + i.Year + '-gender.csv');
                self.medalChart.update('data/' + i.Year + '/' + i.Year + '-top10.csv');
                self.compareOther.update('data/rawdata/summerCities.csv');
            }
            else {
                self.map.update(i.Year,i.City,'data/' + i.Year + '/' + i.Year + '_countriesParticipated.csv');
                self.genderChart.update('data/' + i.Year + '/' + i.Year + '-gender.csv');
                self.medalChart.update('data/' + i.Year + '/' + i.Year + '-top10.csv');
                self.compareOther.update('data/rawdata/summerCities.csv');
            }

        });
    svg.selectAll('text')
        .data(self.cities)
        .enter()
        .append('text')
        .attr("class", function(d) {
            return d.Year;
        })
        .attr('x', function (d, i) {
            if (d.Year < 1900) {
                return x(i) + 1 * 90;
            }
            else if (d.Year < 2000) {
                var index = (d.Year - 1900) / 4
                return x(index) + 1 * 90;
            }
            else {
                var index = (d.Year - 2000) / 4
                return x(index) + 1 * 90;
            }

        })
        .attr('y', function (d, i) {
            d.Year = +d.Year;
            if (d.Year < 1900) {
                return 30;
            }
            else if (d.Year < 2000) {
                return 80;
            }
            else {
                return 130;
            }
        })
        .text(function (d, i) {
            if (d.Year < 1900) {
                return "'" + (d.Year - 1800);
            }
            else if (d.Year < 2000) {
                return "'" + (d.Year - 1900);
            }
            else {
                return "'" + (d.Year - 2000);
            }

        })
        .attr('text-align', 'center')
        .on('mouseover', function (d, i) {
             d3.select(this).style("cursor", "pointer"); 

             var yearClass = d3.select(this).attr("class");
             // yearClass = "#"+ yearClass + " rect"
             // document.getElementById(yearClass).style.backgroundColor="red";
             // document.getElementById(yearClass).style.color="red";
             // $("#" + yearClass).css("fill", "red");
             // console.log(document.getElementById(yearClass));
             // d3.select("#1896").attr('fill', 'pink');
             // console.log(yearClass);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).style("cursor", "default"); 
        })
        .on('click', function (d, i) {
            
            if (i.Year == 2016 || i.Year ==2020) {
                self.map.update(i.Year,i.City,'data/' + i.Year + '/' + i.Year + '-athleteCountByCountry.csv');
                self.genderChart.update('data/' + i.Year + '/' + i.Year + '-gender.csv');
                self.medalChart.update('data/' + i.Year + '/' + i.Year + '-top10.csv');
                self.compareOther.update('data/rawdata/summerCities.csv');
            }
            else {
                self.map.update(i.Year,i.City,'data/' + i.Year + '/' + i.Year + '_countriesParticipated.csv');
                self.genderChart.update('data/' + i.Year + '/' + i.Year + '-gender.csv');
                self.medalChart.update('data/' + i.Year + '/' + i.Year + '-top10.csv');
                self.compareOther.update('data/rawdata/summerCities.csv');
            }

        });

    svg.append('text')
        .attr('x', 20)
        .attr('y', 30)
        .text('1800s');
    svg.append('text')
        .attr('x', 20)
        .attr('y', 80)
        .text('1900s');
    svg.append('text')
        .attr('x', 20)
        .attr('y', 130)
        .text('2000s');
};
