import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  setup: false,

  /**
   * Construction handler
   * This will create the canvas and check the given
   * input values since Chart.js can react pretty odd
   * when getting wrong and/or missing values.
   */
  didRender: function(){

  	var data = this.get("data")

  	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

  	var label_array = []
  	Ember.$.each(data, function(i, item) {
  		var period = item.PERIOD_YEAR;
  		label_array.push(period);
  	});
  	var direct_cost_array = []
  	Ember.$.each(data, function(i, item) {
  		var period = item.DIRECT_COST;
  		direct_cost_array.push(period);
  	});
  	var child_cost_array = []
  	Ember.$.each(data, function(i, item) {
  		var period = item.CHILD_COST;
  		child_cost_array.push(period);
  	});


	var barChartData = {
		labels : label_array,
		datasets : [
			{
				label: "Direct Cost",
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : direct_cost_array
			},
			{
				label: "Child Cost",
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : child_cost_array
			}
		]
	}

    var canvas  = this.get('element');
    var ctx = canvas.getContext('2d');
    // var ctx = document.getElementById("canvas").getContext("2d");
    var chart= new Chart(ctx).Bar(barChartData, {
			responsive : true
	});

	$(canvas).parent().append("<div id='chart-legend'></div>")
	$("#chart-legend").html(chart.generateLegend())


  }


});
