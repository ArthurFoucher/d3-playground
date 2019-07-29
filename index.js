const data = [4, 8, 15, 16, 23, 42];

const scale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, 500]);

d3.select('body')
  .append('div')
  .attr('class', 'chart')
  .selectAll('div')
  .data(data)
  .join(enter =>
    enter
      .append('div')
      .style('width', d => `${scale(d)}px`)
      .text(d => d)
  );
