var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height'),
  g = svg.append('g').attr('transform', 'translate(32,' + height / 2 + ')');

function update(data) {
  g.transition().duration(750);
  var text = g.selectAll('text').data(data, d => d);

  text.attr('class', 'update');

  text
    .enter()
    .append('text')
    .attr('class', 'enter')
    // @ts-ignore
    .merge(text)
    .text(d => d)
    .transition()
    .attr('x', (d, i) => i * 32);

  text
    .exit()
    .attr('class', 'exit')
    .transition()
    .attr('dy', 50)
    .style('opacity', 0)
    .remove();
}

update(alphabet);

d3.interval(function() {
  update(
    d3
      .shuffle(alphabet.split(''))
      .slice(0, Math.floor(Math.random() * 26))
      .sort()
  );
}, 1500);
