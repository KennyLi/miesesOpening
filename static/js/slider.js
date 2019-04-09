var upperHP, upperATK, upperDEF, upperSPE, upperSPD, upperSPA;
var lowerHP, lowerATK, lowerDEF, lowerSPE, lowerSPD, lowerSPA;
upperHP = 200, upperATK = 200, upperDEF = 200, upperSPE = 200, upperSPD = 200, upperSPA = 200;
lowerHP = 50, lowerATK = 50, lowerDEF = 50, lowerSPE = 50, lowerSPD = 50, lowerSPA = 50;
var upper = [
    {axis: "HP", value: upperHP},
    {axis: "Atk", value: upperATK},
    {axis: "Def", value: upperDEF},
    {axis: "Speed", value: upperSPE},
    {axis: "SpDef", value: upperSPD},
    {axis: "SpAtk", value: upperSPA}
]

var lower = [
    {axis: "HP", value: lowerHP},
    {axis: "Atk", value: lowerATK},
    {axis: "Def", value: lowerDEF},
    {axis: "Speed", value: lowerSPE},
    {axis: "SpDef", value: lowerSPD},
    {axis: "SpAtk", value: lowerSPA}
]


var mkjson = (min0, max0, min1, max1, min2, max2, min3, max3, min4, max4, min5, max5) => {
    return {
        "HP": {
            "min": min0,
            "max": max0
        },
        "Attack": {
            "min": min1,
            "max": max1
        },
        "Defense": {
            "min": min2,
            "max": max2
        },
        "Sp Attack": {
            "min": min3,
            "max": max3
        },
        "Sp Defense": {
            "min": min4,
            "max": max4
        },
        "Speed": {
            "min": min5,
            "max": max5
        }

    };
}

var colors = {
    Normal: "#a8a878",
    Fighting: "#c03027",
    Flying: "#a890f0",
    Poison: "#a040a0",
    Ground: "#e0c068",
    Rock: "#b7a037",
    Bug: "#a7b820",
    Ghost: "#705898",
    Steel: "#b8b7d0",
    Fire: "#f08030",
    Water: "#6990f0",
    Grass: "#78c850",
    Electric: "#f8cf30",
    Psychic: "#f85888",
    Ice: "#98d8d8",
    Dragon: "#7137f8",
    Dark: "#715848",
    Fairy: "#ee99ac"
};

var type_filter = "Reset";

var get_pokemon = (json) => {
    var promise = new Promise(function (resolve, reject) {
        $.get("/api_stats/", {"stats_json": JSON.stringify(json), "type": type_filter})
            .done(function (response) {
                resolve(response);
            })
            .fail(function () {
                reject();
            });
    });

    promise.then(function (result) {
        var results = JSON.parse(result)['hello'];
        var table = document.getElementById('results');
        table.innerHTML = ""; // clear
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            var div = document.createElement('div');
            var p = document.createElement('p');
            p.style.color = colors[results[i]['type'][0]];
            p.innerHTML = results[i]['name'];
            var id = document.createElement('small');
            id.innerHTML = results[i]['id'];
            id.id = "id";
            var image = document.createElement('img');
            image.src = results[i]['sprite'];
            var hp = results[i]['HP'];
            var att = results[i]['Attack'];
            var def = results[i]['Defense'];
            var spd = results[i]['Speed'];
            var sp_att = results[i]['Sp Attack'];
            var sp_def = results[i]['Sp Defense'];
            var text0 = document.createElement('small');
            text0.innerHTML = "HP: " + hp;
            var text1 = document.createElement('small');
            text1.innerHTML = "Attack: " + att;
            var text2 = document.createElement('small');
            text2.innerHTML = "Defense: " + def;
            var text3 = document.createElement('small');
            text3.innerHTML = "Speed: " + spd;
            var text4 = document.createElement('small');
            text4.innerHTML = "Sp Atk: " + sp_att;
            var text5 = document.createElement('small');
            text5.innerHTML = "Sp Def: " + sp_def;
            div.appendChild(image);
            div.appendChild(p);
            div.appendChild(id);
            div.appendChild(document.createElement('br'));
            div.appendChild(text0);
            div.appendChild(text1);
            div.appendChild(text2);
            div.appendChild(text3);
            div.appendChild(text4);
            div.appendChild(text5);
            table.appendChild(div);
        }
    }, function (err) {
        console.log(err);
    });
}

var my_json;

var detectChange = () => {
    console.log("change in slider detected");
    var HP_hi = upper[0]['value'];
    var HP_lo = lower[0]['value'];
    var ATK_hi = upper[1]['value'];
    var ATK_lo = lower[1]['value'];
    var DEF_hi = upper[2]['value'];
    var DEF_lo = lower[2]['value'];
    var SPD_hi = upper[3]['value'];
    var SPD_lo = lower[3]['value'];
    var SPDEF_hi = upper[4]['value'];
    var SPDEF_lo = lower[4]['value'];
    var SPATK_hi = upper[5]['value'];
    var SPATK_lo = lower[5]['value'];

    my_json = mkjson(HP_lo, HP_hi, ATK_lo, ATK_hi, DEF_lo, DEF_hi, SPATK_lo, SPATK_hi, SPDEF_lo, SPDEF_hi, SPD_lo, SPD_hi);

    get_pokemon(my_json);
}

var RadarChart = {
    draw: function (id, lower, upper) {
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
            TranslateX: 30,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            color: d3.scaleOrdinal(d3.schemeCategory10),
            maxValue: 300
        };

        var allAxis = (lower.map(function (i, j) {
            return i.axis
        }));
        var total = allAxis.length;
        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        var Format = d3.format('');
        d3.select(id).select("svg").remove();

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
                .attr("x", function (lower) {
                    return levelFactor * (1 - cfg.factor * Math.sin(0));
                })
                .attr("y", function (lower) {
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
            .attr("x2", function (lower, i) {
                return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
            })
            .attr("y2", function (lower, i) {
                return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .text(function (lower) {
                return lower
            })
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function (lower, i) {
                return "translate(0, -10)"
            })
            .attr("x", function (lower, i) {
                return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
            })
            .attr("y", function (lower, i) {
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
            });


        dataValues = [];
        g.selectAll(".nodes")
            .data(lower, function (j, i) {
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
            .attr("points", function (lower) {
                var str = "";
                for (var pti = 0; pti < lower.length; pti++) {
                    str = str + lower[pti][0] + "," + lower[pti][1] + " ";
                }
                return str;
            })
            .style("fill-opacity", 0.3)

        dataValues = [];
        g.selectAll(".nodes")
            .data(upper, function (j, i) {
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
            .attr("points", function (upper) {
                var str = "";
                for (var pti = 0; pti < upper.length; pti++) {
                    str = str + upper[pti][0] + "," + upper[pti][1] + " ";
                }
                return str;
            })
            .style("fill-opacity", cfg.opacityArea)
            .style("fill", function (j, i) {
                return cfg.color(0)
            })
    }
};


function update() {
    RadarChart.draw("#chart", lower, upper)
};

d3.select("button").on("click", update);

RadarChart.draw("#chart", lower, upper);


for (let i = 0; i < lower.length; i++) {
    ax = d3.select("#slider")
        .append('div')
        .attr('id', lower[i]["axis"]);
    valdiv = ax.append('div')
        .attr('id', 'value-' + lower[i]["axis"])
    valdiv.append('h')
        .text(lower[i]["axis"])
    valdiv.append('p')
        .attr('id', 'value-' + lower[i]["axis"]);
    ax.append('div')
        .attr('class', 'col-sm')
        .attr('id', 'slider-' + lower[i]["axis"]);

    var sliderRange = d3
        .sliderBottom()
        .min(0)
        .max(255)
        .width(300)
        .tickFormat(d3.format('d'))
        .ticks(5)
        .default([50, 200])
        .fill('#2196f3')
        .on('onchange', val => {
            d3.select('p#value-' + lower[i]["axis"]).text(val.map(d3.format('d')).join('-'));
            lower[i]["value"] = val[0]
            upper[i]["value"] = val[1]
            update()
            detectChange();
        });

    var gRange = d3
        .select('div#slider-' + lower[i]["axis"])
        .append('svg')
        .attr('width', 400)
        .attr('height', 100)
        .attr('x', 50)
        .attr('y', 50)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gRange.call(sliderRange);

    d3.select('p#value-' + lower[i]["axis"]).text(
        sliderRange
            .value()
            .map(d3.format('d'))
            .join('-')
    );
}
;


var type_spans = document.getElementsByClassName("type_span");
for (var i = 0; i < type_spans.length; i++) {
    type_spans[i].addEventListener('click', function () {
        var span_type = this.innerText;
        type_filter = span_type;
        console.log(span_type);
        if (typeof my_json != "undefined") {
            get_pokemon(my_json);
        }
    });
}

my_json = mkjson(50, 200, 50, 200,50, 200,50, 200,50, 200,50, 200);

get_pokemon(my_json);