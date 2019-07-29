var chartData = [4, 8, 15, 16, 23, 42];

d3.select('body')
  .append('div')
  .attr('class', 'chart')
  .selectAll('div')
  .data(chartData)
  .enter()
  .append((d, i) =>
    i % 2 ? document.createElement('div') : document.createElement('span')
  )
  .style('width', d => `${d * 10}px`)
  .text(d => d);

const RADIUS = 25;
const circleData = [{ x: 2 * RADIUS, y: RADIUS }, { x: 5 * RADIUS, y: RADIUS }];

d3.select('body')
  .append('svg')
  .attr('class', 'circle')
  .selectAll('circle')
  .data(circleData)
  .enter()
  .append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('fill', (d, i) => (i % 2 ? 'aquamarine' : 'deepskyblue'))
  .attr('r', RADIUS);
