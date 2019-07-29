var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height'),
  g = svg.append('g').attr('transform', 'translate(32,' + height / 2 + ')');

function update(data) {
  const t = g.transition().duration(750);
  g.selectAll('text')
    .data(data, d => d)
    .join(
      enter =>
        enter
          .append('text')
          .attr('class', 'enter')
          .attr('x', (d, i) => i * 32)
          .attr('dy', -50)
          .attr('opacity', 0)
          .text(d => d)
          .call(enter =>
            enter
              .transition(t)
              .attr('dy', 0)
              .attr('opacity', 1)
          ),
      update =>
        update
          .attr('class', 'update')
          .call(enter => enter.transition(t).attr('x', (d, i) => i * 32)),

      exit =>
        exit.attr('class', 'exit').call(exit =>
          exit
            .transition()
            .attr('dy', 50)
            .style('opacity', 0)
            .remove()
        )
    );
}

update(alphabet.split(''));

d3.interval(function() {
  update(
    d3
      .shuffle(alphabet.split(''))
      .slice(0, Math.floor(Math.random() * 26))
      .sort()
  );
}, 1500);
