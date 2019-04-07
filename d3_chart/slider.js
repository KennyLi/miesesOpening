// Range
var axes = ['atk','def','spatk','spdef','hp','speed'];

for (let i = 0; i < axes.length; i++){
  ax = d3.select('div#thing')
    .append('div')
    .attr('id',axes[i]);
  ax.append('div')
    .attr('class','col-sm-2')
    .attr('id','value-'+axes[i])
    .append('p')
    .attr('id','value-'+axes[i]);
  ax.append('div')
    .attr('class','col-sm')
    .attr('id','slider-'+axes[i]);

  var sliderRange = d3
    .sliderBottom()
    .min(0)
    .max(255)
    .width(300)
    .tickFormat(d3.format('d'))
    .ticks(5)
    .default([100, 200])
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-'+axes[i]).text(val.map(d3.format('d')).join('-'));
    });

  var gRange = d3
    .select('div#slider-'+axes[i])
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .attr('x',0)
    .attr('y',100*i)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  d3.select('p#value-'+axes[i]).text(
    sliderRange
      .value()
      .map(d3.format('d'))
      .join('-')
  );
};
