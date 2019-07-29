const div = document.createElement('div');
div.innerHTML = 'Hello, world!';
document.body.appendChild(div);

const body = d3.select('body');
const div2 = d3.select('body').append('div');
div2.html('Hello, world!');
