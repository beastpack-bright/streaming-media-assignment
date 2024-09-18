const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.resolve(__dirname, '../client/client.html'));
const client2 = fs.readFileSync(path.resolve(__dirname, '../client/client2.html'));
const client3 = fs.readFileSync(path.resolve(__dirname, '../client/client3.html'));

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();

  return getIndex;
};

const getClient2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client2);
  response.end();

  return getClient2;
};

const getClient3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client3);
  response.end();

  return getClient3;
};

module.exports = {
  getIndex,
  getClient2,
  getClient3,
};
