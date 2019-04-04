var width = 1400,
    height = 700,
    padding = 75;
//incineroar stats
var data = [
    {"hp":95,
    "atk":115,
    "def":90,
    "spatk":80,
    "spdef":90,
    "speed":60}
];/*
var data = [
              {"atk":102,
              "def":23,
              "hp":43,
              "spatk":15,
              "spdef":14,
              "speed":16},
              {"atk":23,
              "def":24,
              "hp":26,
              "spatk":12,
              "spdef":11,
              "speed":12},
              {"atk":20,
              "def":15,
              "hp":18,
              "spatk":30,
              "spdef":5,
              "speed":6}
            ];
*/
//console.log(data)
var stats = [[],[],[],[],[],[]];
//var triangles = []
for (let i = 0; i < data.length; i++){
  stats[0].push(data[i]["hp"]);
  stats[1].push(data[i]["atk"]);
  stats[2].push(data[i]["def"]);
  stats[3].push(data[i]["spatk"]);
  stats[4].push(data[i]["spdef"]);
  stats[5].push(data[i]["speed"]);
  //stats.push([data[i]["hp"],data[i]["atk"],data[i]["def"],data[i]["spatk"],data[i]["spdef"],data[i]["speed"]]);
};

//console.log(stats);


var svg = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height)

var axes = [0,0,0,0,0,0]

for (let i = 0; i < 6; i++ ){
  axes[i] = d3.scaleLinear()
    .domain([0,200])
    .range([0,200]);
}
/*var chart = d3.select("svg")
  .draw("")
*/
var points = [];
group = svg.append("g")
for (let ax = 0; ax < 6; ax++){
  dat = group
    .append("g");
  g = dat
    .append("g")
    .call(d3.axisLeft(axes[ax]));
//    .attr("transform","translate(300,300),rotate("+60*ax+")");
  h = dat
    .append("g");
  h.selectAll("dots")
    .data(stats[ax])
    .enter().append("svg:circle")
    .attr("cy",function(d){
      points.push(axes[ax](d));
      return (axes[ax](d));
    })
    .attr("cx",function(d){
      return (axes[ax](0));
    })
    .attr("r",5)
    .style("opacity",0.6);
  dat.attr("transform","rotate("+(180+60*ax)+")");
};
console.log(points);
var poly = [];
triangles = group.append("g")
for (let i = 0; i < 6; i++){
  tri = triangles
    .append("g");
  poly.push(tri.append("polygon")
    .attr("points","0,0 0,"+points[i]+" "+points[(i+1)%6]*Math.sin(Math.PI/-3)+","+points[(i+1)%6]*Math.cos(Math.PI/-3) )
    .attr("style","fill:orange;stroke:black"));
  tri.attr("transform","rotate("+(180+60*i)+")");
}
console.log(poly);
group.attr("transform","translate(300,300)");



/*
for (let i = 0; i < 6; i++){
  g = group.append("g")
  g.selectAll("dots")
    .data(stats[i])
    .enter().append("svg:circle")
    .attr("cy",function(d){
      return (axes[i](0)+300)*Math.sin(60*i*Math.PI/180);
    })
    .attr("cx",function(d){
      return (axes[i](d)+300)*Math.cos(60*i*Math.PI/180);
    })
    .attr("r",5)
    .style("opacity",0.6);
}
*/
