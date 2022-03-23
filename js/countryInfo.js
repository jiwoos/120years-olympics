/**
 * Constructor for the country Info Chart
 */
function countryChart() {

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
countryChart.prototype.init = function () {
    var self = this;
    self.margin = { top: 30, right: 20, bottom: 30, left: 50 };
 
    var countryInfo = d3.select('#country-info').classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = countryInfo.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 200;
    self.title = countryInfo.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", 40)

    //creates svg element within the div
    self.svg = countryInfo.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)

};

countryChart.prototype.update = function (file, country, year) {
    d3.select('#country-info').style("visibility",'visible')
    var self = this;
    console.log(file)
    console.log(country)
    var countryname = "";
    if (year == 2016 || year == 2020) {
        file = "./data/"+year+"/"+year+"-medalcount.csv"
    }
    else{
        file = './data/'+year+'/'+year+'_countriesMedals.csv'

    }
    Promise.all([
        d3.csv(file),
        d3.csv('./data/rawdata/noc_regions.csv'),
    ]).then(function (files) {
        if (countryname = files[1].find(x => x.NOC === country).notes) {
            countryname = files[1].find(x => x.NOC === country).notes;
        }
        else {
            countryname = files[1].find(x => x.NOC === country).region;
        }

        self.title.selectAll('text').remove();
        self.svg.selectAll('rect').remove();
        self.svg.selectAll('line').remove();
        self.svg.selectAll('text').remove();
        self.title.append('text')
            .attr('x', 20)
            .attr('y', 30)
            .text(countryname)
            .style("font-size", "28px")
        self.svg.append('rect')
            .attr('x', 20)
            .attr('y', 0)
            .attr('height', self.svgHeight)
            //.attr('width', self.svgWidth / 2)
            .attr('width', self.svgWidth)
            .attr('fill', '#FADADD')
            .attr('padding', '5')

        var silverCount = 0;
        var bronzeCount = 0;
        var goldCount = 0;
        if(year == 2016 || year == 2020){
            if(files[0].find(x => x.NOC === country)){
                bronzeCount = files[0].find(x => x.NOC === country).Bronze
                silverCount = files[0].find(x => x.NOC === country).Silver
                goldCount = files[0].find(x => x.NOC === country).Gold
                console.log(bronzeCount)
            }
            console.log(bronzeCount)
        }
        else{
            if (files[0].find(x => x.NOC === country && x.Medal === 'Bronze')) {
                console.log(files[0])
                bronzeCount = parseInt(files[0].find(x => x.NOC === country && x.Medal === 'Bronze').Count);
            }
            if (files[0].find(x => x.NOC === country && x.Medal === 'Silver')) {
                silverCount = parseInt(files[0].find(x => x.NOC === country && x.Medal === 'Silver').Count);
            }
            if (files[0].find(x => x.NOC === country && x.Medal === 'Gold')) {
                goldCount = parseInt(files[0].find(x => x.NOC === country && x.Medal === 'Gold').Count);
            }
        }
        


        var maxDomain = Math.max(bronzeCount, silverCount, goldCount);
        console.log(files[0].find(x => x.NOC === country));
        console.log(silverCount + " " + bronzeCount + " " + goldCount + " ");
        console.log(maxDomain)
        self.x = d3.scaleBand()
            //.rangeRound([50, self.svgWidth / 2])
            .rangeRound([50, self.svgWidth])
            .paddingInner(0.1)
            .domain(d3.range(0, 3));

        self.y = d3.scaleLinear()
            .domain([0, maxDomain])
            .range([self.svgHeight - 30, 40]);

        self.xAxis = d3.axisBottom()
            .scale(self.x);


        self.svg.append('rect')
            .attr('x', self.x(0))
            .attr('width', 70)
            .attr('y', self.y(goldCount))
            .transition()
            .duration(700)
            .attr('height', self.svgHeight - self.y(goldCount) - 30)
            .attr('fill', '#FFD700')

        self.svg.append('line')
            .attr('x1', self.x(0))
            .attr('y1', self.y(0))
            .attr('x2', self.x(0) + 70)
            .attr('y2', self.y(0))
            .attr('stroke', 'black')
            .attr('stroke-width', 2)


        self.svg.append('text')
            .attr('x', self.x(0) + 25)
            .attr('y', self.y(goldCount) - 10)
            .text(goldCount);
        self.svg.append('text')
            .attr('x', self.x(0) + 20)
            .attr('y', self.svgHeight - 10)
            .text("Gold");

        self.svg.append('rect')
            .attr('x', self.x(1))
            .attr('width', 70)
            .attr('y', self.y(silverCount))
            .transition()
            .duration(700)
            .attr('height', self.svgHeight - self.y(silverCount) - 30)
            .attr('fill', '#A8A9AD')

        self.svg.append('line')
            .attr('x1', self.x(1))
            .attr('y1', self.y(0))
            .attr('x2', self.x(1) + 70)
            .attr('y2', self.y(0))
            .attr('stroke', 'black')
            .attr('stroke-width', 2)

        self.svg.append('text')
            .attr('x', self.x(1) + 25)
            .attr('y', self.y(silverCount) - 10)
            .text(silverCount);

        self.svg.append('text')
            .attr('x', self.x(1) + 15)
            .attr('y', self.svgHeight - 10)
            .text("Silver");


        self.svg.append('rect')
            .attr('x', self.x(2))
            .attr('width', 70)
            .attr('y', self.y(bronzeCount))
            .transition()
            .duration(700)
            .attr('height', self.svgHeight - self.y(bronzeCount) - 30)
            .attr('fill', '#CD7F32')

        self.svg.append('line')
            .attr('x1', self.x(2))
            .attr('y1', self.y(0))
            .attr('x2', self.x(2) + 70)
            .attr('y2', self.y(0))
            .attr('stroke', 'black')
            .attr('stroke-width', 2)


        self.svg.append('text')
            .attr('x', self.x(2) + 25)
            .attr('y', self.y(bronzeCount) - 10)
            .text(bronzeCount);
        self.svg.append('text')
            .attr('x', self.x(2) + 10)
            .attr('y', self.svgHeight - 10)
            .text("Bronze");

    }).catch(function (err) {
        // handle error here
    })

};
