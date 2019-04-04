var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Poke1','Poke2','Poke3','Poke4'];

//Data
var d = [
		  [
				{axis:"HP",value:59},
				{axis:"Atk",value:206},
				{axis:"Def",value:42},
				{axis:"Sp Atk",value:115},
				{axis:"Sp Def",value:66},
				{axis:"Speed",value:57}
			],
			[
				{axis:"HP",value:150},
				{axis:"Atk",value:36},
				{axis:"Def",value:75},
				{axis:"Sp Atk",value:115},
				{axis:"Sp Def",value:75},
				{axis:"Speed",value:96}
			],
			[
				{axis:"HP",value:154},
				{axis:"Atk",value:33},
				{axis:"Def",value:72},
				{axis:"Sp Atk",value:105},
				{axis:"Sp Def",value:11},
				{axis:"Speed",value:9}
			],
			[
				{axis:"HP",value:15},
				{axis:"Atk",value:3},
				{axis:"Def",value:7},
				{axis:"Sp Atk",value:115},
				{axis:"Sp Def",value:79},
				{axis:"Speed",value:90}
			]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)')
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Pokemon");

//Initiate Legend
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)')
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
