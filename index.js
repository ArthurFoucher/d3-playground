const data = [4, 8, 15, 16, 23, 42, 23, 13, 59, 43, 25, 41, 2, 22, 37];

const width = 960;
const height = 500;

const scale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

const chart = d3
  .select('.chart')
  .attr('width', width)
  .attr('height', height);

const barWidth = width / data.length;

const bar = chart
  .selectAll('g')
  .data(data)
  .join(enter =>
    enter
      .append('g')
      .attr('transform', (d, i) => `translate(${barWidth * i}, 0)`)
  );

bar
  .append('rect')
  .attr('width', barWidth - 1)
  .attr('height', d => height - scale(d))
  .attr('y', d => scale(d));

bar
  .append('text')
  .text(d => d)
  .attr('x', barWidth / 2)
  .attr('y', d => scale(d) + 3)
  .attr('dy', '0.75em');
