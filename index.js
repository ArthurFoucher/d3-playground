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
