const RADIUS = 25;
const circleData = [{ x: 2 * RADIUS, y: RADIUS }, { x: 5 * RADIUS, y: RADIUS }];

d3.select('body').append('svg');

const update = () => {
  const circle = d3
    .select('svg')
    .selectAll('circle')
    .data(circleData);

  circle
    .exit()
    .transition()
    .attr('r', 0)
    .remove();

  const circleCreate = circle.enter().append('circle');

  circleCreate
    // @ts-ignore
    .merge(circle)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('fill', (d, i) => (i % 2 ? 'aquamarine' : 'deepskyblue'));

  circleCreate
    .attr('r', 0)
    .transition()
    .attr('r', RADIUS);
};

update();

const id = setInterval(() => {
  circleData.pop();
  update();

  if (circleData.length === 0) {
    clearInterval(id);
  }
}, 1500);
