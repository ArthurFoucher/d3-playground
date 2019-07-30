/**
 * @typedef {object} BarData
 * @property {number} value
 * @property {string} name
 * @property {boolean} up
 */

/**
 * @type {BarData[]}
 */
const initialData = [
  { value: 4, name: 'A', up: true },
  { value: 8, name: 'B', up: true },
  { value: 15, name: 'C', up: true },
  { value: 16, name: 'D', up: true },
  { value: 23, name: 'E', up: true },
  { value: 42, name: 'F', up: false },
  { value: 23, name: 'G', up: true },
  { value: 13, name: 'H', up: true },
  { value: 49, name: 'I', up: false },
  { value: 43, name: 'J', up: false },
  { value: 25, name: 'K', up: true },
  { value: 41, name: 'L', up: false },
  { value: 6, name: 'M', up: true },
  { value: 22, name: 'N', up: true },
  { value: 37, name: 'O', up: false }
];

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

const y = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y);

const chart = d3
  .select('.chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const axisHolder = chart.append('g').attr('class', 'axis-holder');

chart.append('g').attr('class', 'bar-holder');

x.domain(initialData.map(d => d.name));
y.domain([0, 50]);

axisHolder.selectAll('g').remove();
axisHolder
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

axisHolder
  .append('g')
  .attr('class', 'y axis')
  .call(yAxis);

/**
 * Call the d3 mechanics to update the bars
 * @param {BarData[]} data
 */
const update = data => {
  chart
    .select('g')
    .selectAll('.bar')
    .data(data, d => d.name)
    .join(
      enter =>
        enter
          .append('g')
          .attr('class', 'bar')
          .attr('transform', d => `translate(${x(d.name)}, ${y(d.value)})`)
          .call(en =>
            en // bar
              .append('rect')
              .attr('class', 'bar-line')
              .attr('height', d => height - y(d.value))
              .attr('width', x.bandwidth())
          )
          .call(en =>
            en // text
              .append('text')
              .attr('class', 'bar-text')
              .html(d => `${d.value}`)
              .attr('x', () => x.bandwidth() / 2)
              .attr('dx', function() {
                return -this.getBBox().width / 2;
              })
              .attr('dy', function() {
                return this.getBBox().height;
              })
          ),
      update =>
        update
          .attr('transform', d => `translate(${x(d.name)}, ${y(d.value)})`)
          .call(up =>
            up // update rect height with transition
              .select('rect')
              .attr('height', d => height - y(d.value))
          )
          .call(up => up.select('text').html(d => `${d.value}`)),
      exit => exit.remove()
    );
};

/**
 * Compute the next bar chart value based on value and direction
 * @param {BarData[]} data
 * @returns {BarData[]}
 */
const getNextStep = data => {
  for (const d of data) {
    const { value, up } = d;
    d.up = value > 0 && value < 50 ? up : !up;
    d.value = value + (d.up ? 1 : -1);
  }
  return data;
};

update(initialData);

setInterval(
  () => requestAnimationFrame(() => update(getNextStep(initialData))),
  16
);
