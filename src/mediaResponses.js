const fs = require('fs');
const path = require('path');

const loadFile = (request, response, filePath, contentType) => {
  const fullPath = path.resolve(__dirname, filePath);

  fs.stat(fullPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
        return response.end('File not found');
      }
      response.writeHead(500);
      return response.end('Server error');
    }

    let { range } = request.headers;
    if (!range) range = 'bytes=0-';

    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    if (start > end) start = end - 1;

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });
    const stream = fs.createReadStream(fullPath, { start, end });
    stream.on('open', () => stream.pipe(response));
    stream.on('error', (streamErr) => response.end(streamErr));
  });
  return loadFile;
};

const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');

  return getParty;
};

const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
  return getBling;
};

const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
  return getBird;
};

module.exports = { // trying this syntax again!
  getParty,
  getBling,
  getBird,
};
