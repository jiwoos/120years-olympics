/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function(){
    var instance = null;
    function init() {
        //Creating instances for each visualization
        var map = new countryMapChart();
        // var info = new countryChart();
        var medal = new MedalChart();
        var genderChart = new GenderChart();
        var compareOther = new CompareOther();
        // var genderOverTime = new GenderOverTime();

        d3.csv("data/rawdata/summerCities.csv")
            .then(function(cities) {
                //pass the instances of all the charts that update on selection change in YearChart
                //var yearCitiesChart = new YearCitiesChart(map,info,medal,genderChart,cities, compareOther);
                var yearCitiesChart = new YearCitiesChart(map,medal,genderChart,cities, compareOther);
                var genderOverTime = new GenderOverTime(map,medal,genderChart,cities, compareOther);
                genderOverTime.update();
                yearCitiesChart.update();
            });
    }

    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this
        if(self.instance == null){
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();