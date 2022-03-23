/**
 * Constructor for the medal Count Chart
 */
function countryMapChart() {

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
countryMapChart.prototype.init = function () {
    var self = this;
    self.margin = { top: 30, right: 20, bottom: 30, left: 50 };

    self.countrymap = d3.select('#country-map').classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = self.countrymap.node().getBoundingClientRect();
    self.svgWidth = (self.svgBounds.width - self.margin.left - self.margin.right);
    self.svgHeight =800;



    //creates svg element within the div
    self.title = self.countrymap.append("svg")
        .attr("width", self.svgWidth * 3)
        .attr("height", 50)

    // self.instructions = self.countrymap.append("p")
    //     .attr("width",self.svgWidth)
    //     .attr("height",50)
    self.instructions = self.countrymap
        .append('h4')
        .attr('x', 10)
        .attr('y', 10)
        .text("Each circle represents a country participating in this olympics with the size of the circle corresponding to the total number of medals won by that country.")
    self.instructions
        .style('visibility', 'hidden')
    self.instructions3 = self.countrymap
        .append('h4')
        .attr('x', 10)
        .attr('y', 10)
        .text("Hover over the circles to get the country name and total medal count for that country.")
    self.instructions3
        .style('visibility', 'hidden')
    self.instructions2 = self.countrymap
        .append('h4')
        .attr('x', 10)
        .attr('y', 10)
        .text("Click on circle to get the medal count breakdown for that country.")
    self.instructions2
        .style('visibility', 'hidden')

    self.tooltip = self.countrymap.append("div")
        .style('width', 120 + 'px')
        .style('height', 35 + 'px')
        .style('z-index', 10)
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("padding", 5 + "px")
        .style('text-align', 'center')
        .style('background-color', '#c4c4c4');


    self.svg = self.countrymap.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)
        .attr("class", "bubble");

    self.svg1 = self.countrymap.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", 20)
        .attr("class", "legend");

    self.info = new countryChart();



    

};


countryMapChart.prototype.update = function (year, hostCity, countryList) {

    var self = this;

    d3.select('#country-info').style("visibility", 'hidden')
    // self.svg.selectAll('circle').remove();
    // self.svg.selectAll('text').remove();
    d3.select('#country-map').selectAll('p').remove()

    self.svg.remove();
    

    self.instructions
        .style('visibility', 'hidden');
    self.instructions2
        .style('visibility', 'hidden')

    self.title.selectAll('text').remove();
    // self.instructions.remove();
    self.svg1.remove();
    var title = "";
    if (year == 1916 || year == 1940 || year == 1944) {
        title = year;
    }
    else {
        title = hostCity + " " + year + " Summer Olympics";
    }

    self.title.attr('class', 'olympictitle');
    self.title.append('text')
        .attr('x', 30)
        .attr('y', 30)
        .attr('font-size', 30)
        .attr('class', 'olympictitle')
        .text(title)

    if (year == 1916) {
        d3.select('#country-map').append("p")
            //self.svg.append('text')
            .attr('x', 30)
            .attr('y', 100)
            .style('font-size', 30)
            .text("The Olympics were cancelled for the first time in 1916. It was originally going to be held in Berlin, Germany but was cancelled due to World War I.")

    }
    else if (year == 1940) {
        d3.select('#country-map').append("p")
            .style('font-size', 30)
            .text("The Olympics were cancelled in 1940. It was originally going to be held in Japan but Japan cancelled as Japan went to war with China. So the venue was changed to Finland but cancelled again as Hitler invaded Poland.")
    }
    else if (year == 1944) {
        d3.select('#country-map').append("p")
            // self.svg.append('text')
            .attr('x', 30)
            .attr('y', 100)
            .style('font-size', 30)
            .text("The Olympics were cancelled in 1944. It was originally going to be held in London but was cancelled due to the ongoing war (World War III).")
    }
    else {
        // Title of each region

        self.instructions
            .style('visibility', 'visible');
        self.instructions2
            .style('visibility', 'visible')
        self.instructions3
            .style('visibility', 'visible')

        self.svg1 = self.countrymap.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", 20)
        self.svg1.append('text')
            .attr('x',40)
            .attr('y',12)
            .text('Americas')

        self.svg1.append('text')
            .attr('x',self.svgWidth/6+40)
            .attr('y',12)  
            .text('Asia')
        self.svg1.append('text')
            .attr('x',self.svgWidth*2/6+20)
            .attr('y',12)
            .text('Africa')
        self.svg1.append('text')
            .attr('x',self.svgWidth*3/6+20)
            .attr('y',12)
            .text('Europe')
        self.svg1.append('text')
            .attr('x',self.svgWidth*4/6+20)
            .attr('y',12)
            .text('Oceania')
        self.svg1.append('text')
            .attr('x',self.svgWidth*5/6+20)
            .attr('y',12)
            .text('Other')

        self.svg1.append('circle')
            .attr('cx',20)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill',"#FFC0C0")

        self.svg1.append('circle')
            .attr('cx',self.svgWidth/6+20)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill',"#FFF59F")

        self.svg1.append('circle')
            .attr('cx',self.svgWidth*2/6)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill',"#E7E7E7")

        self.svg1.append('circle')
            .attr('cx',self.svgWidth*3/6)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill',"#B8E8FA")

        self.svg1.append('circle')
            .attr('cx',self.svgWidth*4/6)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill',"#D5F7C6")

        self.svg1.append('circle')
            .attr('cx',self.svgWidth*5/6)
            .attr('cy',7)
            .attr('r',5)
            .attr('fill', '#F7E7FF')
           
        self.svg = self.countrymap.append("svg")
            .attr("width", self.svgWidth)
            .attr("height",self.svgHeight)

        d3.select('#compare').style("visibility", 'visible')
        d3.select('#gender-chart').style("visibility", 'visible')
        d3.select('#medal-rankings').style("visibility", 'visible')


        var medalData = '';
        if (year == 2016 || year == 2020) {
            medalData = './data/' + year + '/' + year + '-medalcount.csv'
            medal = './data/' + year + '/' + year + '-medalcount.csv'
        }
        else {
            medalData = './data/' + year + '/' + year + '_countriesMedals.csv'
            medal = './data/' + year + '/' + year + '-medals.csv'
        }
        Promise.all([
            d3.csv(countryList),
            d3.csv('./data/rawdata/noc_regions.csv'),
            d3.csv(medal),
            d3.csv(medalData)

        ]).then(function (files) {

            var bubble = d3.pack(files[0])
                .size([self.svgWidth, self.svgHeight])
                .padding(5);
            //console.log(files[3])
            group = d3.group(files[0], d => d.continent)

            // var nodes = d3.hierarchy({ children: files[0]})
            var nodes = d3.hierarchy(group)
                .sum(function (d) {
                    //console.log(d)
                    var silverCount = 1;
                    var bronzeCount = 1;
                    var goldCount = 1;

                    if (year == 2016 || year == 2020) {
                        if (files[3].find(x => x.NOC === d.nationality)) {
                            bronzeCount += parseInt(files[3].find(x => x.NOC === d.nationality).Bronze);
                            silverCount += parseInt(files[3].find(x => x.NOC === d.nationality).Silver);
                            goldCount += parseInt(files[3].find(x => x.NOC === d.nationality).Gold);
                        }
                    }
                    else {
                        if (files[3].find(x => x.NOC === d.NOC && x.Medal === 'Bronze')) {
                            bronzeCount += parseInt(files[3].find(x => x.NOC === d.NOC && x.Medal === 'Bronze').Count);
                        }
                        if (files[3].find(x => x.NOC === d.NOC && x.Medal === 'Silver')) {
                            silverCount += parseInt(files[3].find(x => x.NOC === d.NOC && x.Medal === 'Silver').Count);
                        }
                        if (files[3].find(x => x.NOC === d.NOC && x.Medal === 'Gold')) {
                            goldCount += parseInt(files[3].find(x => x.NOC === d.NOC && x.Medal === 'Gold').Count);
                        }
                    }

                    return goldCount + silverCount + bronzeCount;
                });

            var forceCollide = d3.forceCollide(function (d) {
                return d.r;
            })
            var x = [150, 300, 450]
            var y = [100, 200];
            var simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(5))
                .force('x', d3.forceX(function (d) {
                    if (d.continent == "Asia") {
                        return x[0];
                    }
                    if (d.continent == "Europe") {
                        return x[1];
                    }
                    if (d.continent == "Africa") {
                        return x[0];
                    }
                    if (d.continent == "America") {
                        return x[2];
                    }
                    if (d.continent == "Oceania") {
                        return x[1];
                    }
                    else {
                        return x[2];
                    }
                }).strength(0.05))
                .force('y', d3.forceY(function (d) {
                    if (d.continent == "Asia") {
                        return y[0];
                    }
                    if (d.continent == "Europe") {
                        return y[0];
                    }
                    if (d.continent == "Africa") {
                        return y[0];
                    }
                    if (d.continent == "America") {
                        return y[1];
                    }
                    if (d.continent == "Oceania" ) {
                        return y[1];
                    }
                    return y[1];
                }).strength(0.05))
                .force("collide", forceCollide);

            var node = self.svg.selectAll(".node")
                .data(bubble(nodes).descendants())
                .enter()
                .filter(function (d) {
                    return !d.children
                })
                .append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + (d.x) + "," + d.y + ")";

                })

            simulation.nodes(files[0])
                .on('tick',ticked)
            function ticked(){
                node
                .attr("cx",function(d){
                    return d.x
                })
                .attr("cx",function(d){
                    return d.y
                })
            }

            node.append("title")
                .text(function (d) {
                    var silverCount = 0;
                    var bronzeCount = 0;
                    var goldCount = 0;
                    var name = '';
                    if (year == 2016 || year == 2020) {
                        name = d.data.Country_Name;
                        if (files[3].find(x => x.NOC === d.data.nationality)) {
                            bronzeCount = parseInt(files[3].find(x => x.NOC === d.data.nationality).Bronze);
                            silverCount = parseInt(files[3].find(x => x.NOC === d.data.nationality).Silver);
                            goldCount = parseInt(files[3].find(x => x.NOC === d.data.nationality).Gold);

                        }
                        // console.log(d.data.nationality)
                        // console.log(files[1].find(x => x.NOC === d.data.nationality))

                    }
                    else {
                        name = d.data.NOC
                        if (files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Bronze')) {
                            bronzeCount = parseInt(files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Bronze').Count);
                        }
                        if (files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Silver')) {
                            silverCount = parseInt(files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Silver').Count);
                        }
                        if (files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Gold')) {
                            goldCount = parseInt(files[3].find(x => x.NOC === d.data.NOC && x.Medal === 'Gold').Count);
                        }
                        if (files[1].find(x => x.NOC === d.data.NOC).notes) {
                            name = files[1].find(x => x.NOC === d.data.NOC).notes;
                        }
                        else {
                            name = files[1].find(x => x.NOC === d.data.NOC).region;
                        }
                    }
                    return name + ": " + (goldCount + silverCount + bronzeCount);
                });

            node.append("circle")
                .attr("r", function (d) {
                    return d.r;
                })
                .attr("class", function (d) {
                    return d.r;
                })
                .style("fill", function (d, i) {
                    if (d.data.continent == "Europe") {
                        return "#B8E8FA";
                    }
                    if (d.data.continent == "Africa") {
                        return "#E7E7E7";
                    }
                    if (d.data.continent == "America") {
                        return "#FFC0C0";
                    }
                    if (d.data.continent == "Asia") {
                        return "#FFF59F";
                    }
                    if (d.data.continent == "Oceania") {
                        return "#D5F7C6";
                    }
                    return '#F7E7FF';
                })
                .on('mouseover', function (d, i) {
                    var radius = d3.select(this).attr("class");
                    radius = radius * 1.2;
                    d3.select(this).attr("r", radius);
                    d3.select(this).style("cursor", "pointer");
                })
                .on("mouseout", function (d) {
                    var radius = d3.select(this).attr("class");
                    d3.select(this).attr("r", radius);
                    d3.select(this).style("cursor", "default");
                })
                .on('click', function (d, i) {
                    console.log(i)
                    if (year == 2016 || year == 2020) {
                        medalData = './data/' + year + '/' + year + '-medalcount.csv'
                        self.info.update(medalData, i.data.nationality, year);
                    }
                    else {
                        medalData = './data/' + year + '/' + year + '_countriesMedals.csv'
                        self.info.update(medalData, i.data.NOC, year);
                    }

                })


            node.append("text")
                .attr("dy", ".2em")
                .style("text-anchor", "middle")
                .text(function (d) {
                    console.log(d)
                    if (year == 2016 || year == 2020) {
                        return d.data.nationality.substring(0, d.r / 3);
                    }
                    else {
                        return d.data.NOC.substring(0, d.r / 3);

                    }
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", function (d) {
                    return d.r  / 2;
                })
                .attr("fill", "black")
                .on('mouseover', function (d, i) {
                    d3.select(this).style("cursor", "pointer");
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("cursor", "default");
                })
                .on('click', function (d, i) {
                    console.log(i)
                    if (year == 2016 || year == 2020) {
                        medalData = './data/' + year + '/' + year + '-medalcount.csv'
                        self.info.update(medalData, i.data.nationality, year);
                    }
                    else {
                        medalData = './data/' + year + '/' + year + '_countriesMedals.csv'
                        self.info.update(medalData, i.data.NOC, year);
                    }


                });

        });
    }

};

