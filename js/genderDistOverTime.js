/**
 * Constructor for the Vote Percentage Chart
 */
function GenderOverTime(countryMapChart, medalChart, genderChart, cities,compareOther) {
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
GenderOverTime.prototype.init = function(){
    var self = this;
    self.margin = {top: 20, right: 150, bottom: 20, left: 150};

    d3.select("#gender-over-time")
        .append('h2')
        .attr('x', 10)
        .attr('y', 10)
        .text("Gender Distribution in the Olympics Over Time")
    d3.select("#gender-over-time")
    .append('h4')
    .attr('x', 10)
    .attr('y', 10)
    .text("Hover over circle to see percentages")
    d3.select("#gender-over-time")
        .append('h4')
        .attr('x', 10)
        .attr('y', 10)
        .text("Click on circle to get breakdown of the year selected")
    
    var genderTime = d3.select("#gender-over-time").classed("content", true);
    genderTime.append('div')
    self.tooltip = genderTime.append("div")
        .style('width',80+'px')
        .style('height',40+'px')
        .style('z-index',10)
        .attr("class", "tool")				
        .style("opacity", 0)
        .style("padding", 5+ "px")		
        .style('text-align','center')
        .style('background-color','#c4c4c4')
        .style('border-radius' ,25);    

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = genderTime.node().getBoundingClientRect();
    // self.svgBounds = document.getElementById('gender-over-time').clientWidth;
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 350 -  self.margin.top - self.margin.bottom;

    //creates svg element within the div
    self.svg = genderTime.append("svg")
        .attr("width",self.svgBounds.width * 0.87)
        .attr("height",350)
        .attr("class", "lineChart")

    self.update();
};


GenderOverTime.prototype.update = function(){
    var self = this;

    d3.csv("data/rawdata/gender-over-time.csv").then(function(genderData) {

        
        var x = d3.scaleLinear()
            .domain([1896, 2020])
            .range([25, self.svgWidth]);

        var y = d3.scaleLinear()
            .domain([0,100])
            .range([0,self.svgHeight-30]);

            //console.log(genderData)


        var femaleLine = self.svg.append('g')
        femaleLine.append('text')
            .attr('x',50)
            .attr('y',285)
            .attr('stroke','pink')
            .attr('font-size', '11px')
            .attr('font-weight', 'lighter')
            .text("Female Percentage")
        femaleLine.selectAll('line').data(genderData)
            .enter()
            .append('line')
            .attr('x1',function(d){
                return x(d.Year);
            })
            .attr('y1',function(d,i){
                return self.svgHeight - y(parseInt(d.female)*100.0)/(parseInt(d.male)+parseInt(d.female));
            })
            .attr('x2',function(d,i){

                if(d.Year == "1912"){
                    return x(parseInt(d.Year)+8)
                }
                if(d.Year == "1936"){
                    return x(parseInt(d.Year)+12)
                }
                if(d.Year == "2020"){
                    return  x(parseInt(d.Year))
                }
                return x(parseInt(d.Year)+4)

            })
            .attr('y2',function(d,i){
                if(d.Year == "2020"){
                    return self.svgHeight - y(parseInt(d.female)*100.0)/(parseInt(d.male)+parseInt(d.female));
                }
                //console.log(genderData[i+1])
                // var female = parseInt(genderData[i+1].female)
                return self.svgHeight - y(parseInt(genderData[i+1].female)*100.0)/(parseInt(genderData[i+1].male)+parseInt(genderData[i+1].female));

            })  
            .attr('stroke', 'pink')
        femaleLine.selectAll('circle').data(genderData)
            .enter()
            .append('circle')
            .attr('r',6)
            .attr('cx',function(d){
                return x(d.Year);
            })
            .attr('cy',function(d){
                return self.svgHeight - y(parseInt(d.female)*100.0)/(parseInt(d.male)+parseInt(d.female));

            })
            .attr('stroke','pink')
            .attr('fill','pink')
            .on('mouseover',function(d,i){
                d3.select(this).attr('r', '8')
                d3.select(this).style("cursor", "pointer");
                var femalePercentage = parseInt(i.female)*10000/(parseInt(i.male)+parseInt(i.female));
                var rounded =Math.round(femalePercentage)/100
                //console.log(rounded)
                var text = "Year "+ i.Year+": "+ rounded+"%";
                const[x, y] = d3.pointer(d);
                //console.log(x+"dsfa"+y)
                self.tooltip.style("opacity",1);
                self.tooltip.html(text)
                .style("left", (x) + "px")		
                .style("top", (y) + "px")
                .style('z-index',100)
                .style('position','relative');
            })
            .on("mouseout",function(d){
                d3.select(this).attr('r', '6')
                d3.select(this).style("cursor", "default");
                self.tooltip.style("opacity",0).style("left", 0)		
                .style("top", 0);
            })
            .on('click', function (d, i) {
                $('html,body').animate({
                    scrollTop: $("#year-chart").offset().top},
                    'slow');
    
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

            //<circle cx="50" cy="50" r="50"/>

            var maleLine = self.svg.append('g')
            maleLine.append('text')
            .attr('x',50)
            .attr('y',15)
            .attr('stroke','lightskyblue')
            .attr('font-size', '11px')
            .attr('font-weight', 'lighter')
            .text("Male Percentage")
            maleLine.selectAll('line').data(genderData)
                .enter()
                .append('line')
                .attr('x1',function(d){
                    return x(d.Year);
                })
                .attr('y1',function(d,i){
                    return self.svgHeight - y(parseInt(d.male)*100.0)/(parseInt(d.male)+parseInt(d.female));
                })
                .attr('x2',function(d,i){
    
                    if(d.Year == "1912"){
                        return x(parseInt(d.Year)+8)
                    }
                    if(d.Year == "1936"){
                        return x(parseInt(d.Year)+12)
                    }
                    if(d.Year == "2020"){
                        return  x(parseInt(d.Year))
                    }
                    return x(parseInt(d.Year)+4)
    
                })
                .attr('y2',function(d,i){
                    if(d.Year == "2020"){
                        return self.svgHeight - y(parseInt(d.male)*100.0)/(parseInt(d.male)+parseInt(d.female));
                    }
                    //console.log(genderData[i+1])
                    // var female = parseInt(genderData[i+1].female)
                    return self.svgHeight - y(parseInt(genderData[i+1].male)*100.0)/(parseInt(genderData[i+1].male)+parseInt(genderData[i+1].female));
    
                })  
                .attr('stroke', 'lightskyblue')

            maleLine.selectAll('circle').data(genderData)
                .enter()
                .append('circle')
                .attr('r',6)
                .attr('cx',function(d){
                    return x(d.Year);
                })
                .attr('cy',function(d){
                    return self.svgHeight - y(parseInt(d.male)*100.0)/(parseInt(d.male)+parseInt(d.female));
    
                })
                .attr('stroke','lightskyblue')
                .attr('fill','lightskyblue')
                .on('mouseover',function(d,i){
                    d3.select(this).style("cursor", "pointer"); 
                    d3.select(this).attr('r', '8')
                    var malePercentage = parseInt(i.male)*10000/(parseInt(i.male)+parseInt(i.female));
                    var rounded =Math.round(malePercentage)/100
                    var text = "Year "+ i.Year+": "+ rounded+"%";
                    const[x, y] = d3.pointer(d);
                    //console.log(x+"dsfa"+y)
                    self.tooltip.style("opacity",1);
                    self.tooltip.html(text)
                    .style("left", (x) + "px")		
                    .style("top", (y) + "px")
                    .style('z-index',100)
                    .style('position','relative');
                })
                .on("mouseout",function(d){
                    d3.select(this).style("cursor", "default"); 
                     d3.select(this).attr('r', '6')
                    self.tooltip.style("opacity",0).style("left", 0)		
                    .style("top", 0);
                })
                .on('click', function (d, i) {
                    $('html,body').animate({
                        scrollTop: $("#year-chart").offset().top},
                        'slow');
        
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
    

        var x_axis = d3.axisBottom()
            .scale(x);
        self.svg.append("g")
            .call(x_axis).attr("transform", "translate(0," + self.svgHeight+ ")");
        

        var y_axisScale = d3.scaleLinear()
            .domain([0,100])
            .range([self.svgHeight-30,0]);

        var y_axis = d3.axisLeft()
            .scale(y_axisScale);
        self.svg.append("g")
            .call(y_axis)
            .attr("transform", "translate(25,30)");

        self.svg.append('line')
        .attr('x1',25)
        .attr('y1',self.svgHeight/2+15.5)
        .attr('x2',self.svgWidth)
        .attr('y2',self.svgHeight/2+15.5)
        .attr('stroke','grey')
        .attr('stroke-dasharray',4)

    })
    
    


};
