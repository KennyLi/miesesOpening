var d = [
	{ axis: "HP", value: 59 },
	{ axis: "Atk", value: 206 },
	{ axis: "Def", value: 42 },
	{ axis: "Speed", value: 57 },
	{ axis: "Sp Def", value: 66 },
	{ axis: "Sp Atk", value: 115 }
]

var RadarChart = {
	draw: function (id, d) {
		var cfg = {
			radius: 5,
			w: 500,
			h: 500,
			factor: 1,
			factorLegend: .85,
			levels: 6,
			maxValue: 0.6,
			radians: 2 * Math.PI,
			opacityArea: 0.5,
			ToRight: 5,
			TranslateX: 80,
			TranslateY: 30,
			ExtraWidthX: 100,
			ExtraWidthY: 100,
			color: d3.scale.category10(),
			maxValue: 300
		};

		var allAxis = (d.map(function (i, j) { return i.axis }));
		var total = allAxis.length;
		var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
		var Format = d3.format('');

		var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w + cfg.ExtraWidthX)
			.attr("height", cfg.h + cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
		;

		//Circular segments
		for (var j = 0; j < cfg.levels; j++) {
			var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
			g.selectAll(".levels")
				.data(allAxis)
				.enter()
				.append("svg:line")
				.attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
				.attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
				.attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
				.attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
				.style("stroke", "grey")
				.style("stroke-opacity", "0.75")
				.style("stroke-width", "0.3px")
				.attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
		}

		//Text indicating at what % each level is
		for (var j = 0; j < cfg.levels; j++) {
			var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
			g.selectAll(".levels")
				.data([1]) //dummy data
				.enter()
				.append("svg:text")
				.attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
				.attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
				.style("font-family", "sans-serif")
				.style("font-size", "10px")
				.attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
				.attr("fill", "#737373")
				.text(Format((j + 1) * cfg.maxValue / cfg.levels));
		}

		var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")

		axis.append("line")
			.attr("x1", cfg.w / 2)
			.attr("y1", cfg.h / 2)
			.attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
			.attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
			.style("stroke", "grey")
			.style("stroke-width", "1px");

		axis.append("text")
			.text(function (d) { return d })
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")
			.attr("dy", "1.5em")
			.attr("transform", function (d, i) { return "translate(0, -10)" })
			.attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
			.attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


		dataValues = [];
		g.selectAll(".nodes")
			.data(d, function (j, i) {
				dataValues.push([
					cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
					cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
				]);
			});
		g.selectAll(".area")
			.data([dataValues])
			.enter()
			.append("polygon")
			.style("stroke-width", "2px")
			.style("stroke", cfg.color(0))
			.attr("points", function (d) {
				var str = "";
				for (var pti = 0; pti < d.length; pti++) {
					str = str + d[pti][0] + "," + d[pti][1] + " ";
				}
				return str;
			})
			.style("fill-opacity", cfg.opacityArea)
			.style("fill", function (j, i) { return cfg.color(0) })


		g.selectAll(".nodes")
			.data(d).enter()
			.append("circle")
			.attr('r', cfg.radius)
			.attr("cx", function (j, i) {
				dataValues.push([
					cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
					cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
				]);
				return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
			})
			.attr("cy", function (j, i) {
				return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
			})
			.style("fill", cfg.color(0))
			.style("fill-opacity", 0.9)
		}
};

data = [1,2,3,4,200,0]
var sliderRange = d3.sliderBottom()
	.min(d3.min(data))
	.max(d3.max(data))
	.width(300)
	.tickFormat(d3.format(""))
	.ticks(5)
	.default([0, 200])
	.fill('#2196f3')
	.on('onchange', val => {
		d3.select('p#value-range').text(val.map(d3.format("")).join('-'));
	});

var gRange = d3
	.select('div#slider-range')
	.append('svg')
	.attr('width', 500)
	.attr('height', 100)
	.append('g')
	.attr('transform', 'translate(30,30)');

gRange.call(sliderRange);

d3.select('p#value-range').text(
	sliderRange
		.value()
		.map(d3.format('.2%'))
		.join('-')
);
RadarChart.draw("#chart", d);
