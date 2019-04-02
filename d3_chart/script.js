var width = 1400,
    height = 700,
    padding = 75;
var data = [
              [
                {axis:"atk",value:22},
                {axis:"def",value:21},
                {axis:"hp",value:23},
                {axis:"spatk",value:15},
                {axis:"spdef",value:14},
                {axis:"speed",value:16}
              ],[
                {axis:"atk",value:23},
                {axis:"def",value:24},
                {axis:"hp",value:26},
                {axis:"spatk",value:12},
                {axis:"spdef",value:11},
                {axis:"speed",value:12}
              ],[
                {axis:"atk",value:20},
                {axis:"def",value:15},
                {axis:"hp",value:18},
                {axis:"spatk",value:30},
                {axis:"spdef",value:5},
                {axis:"speed",value:6}
              ]
            ];


var svg = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height)

var chart = d3.select("svg")
  .draw("")
