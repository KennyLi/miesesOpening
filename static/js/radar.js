var hp, atk, def, speed, special_defense, special_attack;
var d;

var types = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
var colors = {
  Normal:"#a8a878",
  Fighting:"#c03027",
  Flying:"#a890f0",
  Poison:"#a040a0",
  Ground:"#e0c068",
  Rock:"#b7a037",
  Bug:"#a7b820",
  Ghost:"#705898",
  Steel:"#b8b7d0",
  Fire:"#f08030",
  Water:"#6990f0",
  Grass:"#78c850",
  Electric:"#f8cf30",
  Psychic:"#f85888",
  Ice:"#98d8d8",
  Dragon:"#7137f8",
  Dark:"#715848",
  Fairy:"#ee99ac"
};

var update_graph = (type) => {
//   console.log(type);
    var promise = new Promise(function (resolve, reject) {

        $.get("/muh_api/", {"type": type})
            .done(function (response) {
                resolve(response);
            })
            .fail(function () {
                reject();
            });
    });

    promise.then(function (result) {
        hp = 0;
        atk = 0;
        def = 0;
        speed = 0;
        special_defense = 0;
        special_attack = 0;

        response = JSON.parse(result)['hello'];
        // console.log(response);
        for (var i = 0; i < response.length; i++) {
            hp += response[i]['HP'];
            atk += response[i]['Attack'];
            def += response[i]['Defense'];
            speed += response[i]['Speed'];
            special_defense += response[i]['Sp Defense'];
            special_attack += response[i]['Sp Attack'];
        }
        hp /= response.length;
        atk /= response.length;
        def /= response.length;
        speed /= response.length;
        special_defense /= response.length;
        special_attack /= response.length;

        // console.log("axis");
        // console.log([hp, atk, def, speed, special_defense, special_attack]);
        // console.log(type);

        d = [
            {axis: "HP", value: hp},
            {axis: "Atk", value: atk},
            {axis: "Def", value: def},
            {axis: "Speed", value: speed},
            {axis: "Sp Def", value: special_defense},
            {axis: "Sp Atk", value: special_attack}
        ];


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
                    ExtraWidthX: 200,
                    ExtraWidthY: 200,
                  //  color: d3.scale.category10(),
                    maxValue: 120
                };

                var allAxis = (d.map(function (i, j) {
                    return i.axis
                }));
                var total = allAxis.length;
                var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
                var Format = d3.format('');

                var svg = d3.select(id).select('svg'),
                    polyPoints = null;
                if (svg.node()) {
                    polyPoints = svg.select("polygon").attr("points");
                    svg.remove();
                }

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
                        .attr("x1", function (d, i) {
                            return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
                        })
                        .attr("y1", function (d, i) {
                            return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
                        })
                        .attr("x2", function (d, i) {
                            return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
                        })
                        .attr("y2", function (d, i) {
                            return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
                        })
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
                        .attr("x", function (d) {
                            return levelFactor * (1 - cfg.factor * Math.sin(0));
                        })
                        .attr("y", function (d) {
                            return levelFactor * (1 - cfg.factor * Math.cos(0));
                        })
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
                    .attr("x2", function (d, i) {
                        return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
                    })
                    .attr("y2", function (d, i) {
                        return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
                    })
                    .style("stroke", "grey")
                    .style("stroke-width", "1px");

                axis.append("text")
                    .text(function (d) {
                        return d
                    })
                    .style("font-family", "sans-serif")
                    .style("font-size", "11px")
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.5em")
                    .attr("transform", function (d, i) {
                        return "translate(0, -10)"
                    })
                    .attr("x", function (d, i) {
                        return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
                    })
                    .attr("y", function (d, i) {
                        return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
                    });


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
                    .style("stroke", colors[type])
                    .attr("points", function (d) {
                        if (polyPoints)
                            return polyPoints;
                        else
                            return d3.range(d.length).map(function () {
                                return (cfg.w / 2) + "," + (cfg.h / 2)
                            }).join(" ");
                    })
                    .style("fill-opacity", cfg.opacityArea)
                    .style("fill", function (j, i) {
                        return colors[type]
                    })

                    .transition()
                    .duration(950)
                    .attr("points", function (d) {
                        var str = "";
                        for (var pti = 0; pti < d.length; pti++) {
                            str = str + d[pti][0] + "," + d[pti][1] + " ";
                        }
                        return str;
                    })


                g.selectAll(".nodes")
                    .data(d).enter()
                    .append("circle")
                    .on('mouseover', function (j, i) {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style("fill", colors[type])
                            .style("fill-opacity", .9)
                            .attr('r', cfg.radius * 2)
                        d3.select("svg")
                            .append("text")
                            .text(j["axis"] + ": " + Math.round(j["value"] * 100) / 100)
                            .attr("text-anchor","middle")
                            .attr("x", 330)
                            .attr("y", 600)
                            .attr("id", "value")
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style("fill", colors[type])
                            .style("fill-opacity", 0.75)
                            .attr('r', cfg.radius)
                        d3.select("#value").remove()
                    })
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
                    .style("fill", colors[type])
                    .style("fill-opacity", 0)

                    .transition()
                    .delay(950)
                    .duration(100)
                    .style("fill-opacity", 0.75)


                ;
            }
        };

        RadarChart.draw("#chart", d);


    }, function (err) {
        console.log(err);
    });

}

var dropdown = document.getElementById("dropdown");
dropdown.addEventListener('change', (event) => {
    type = dropdown.options[dropdown.selectedIndex].value;
    update_graph(type);
    d3.select("div#titlething")
      .text("Average stats for "+type+" types")
});

type = dropdown.options[dropdown.selectedIndex].value;
update_graph(type);
