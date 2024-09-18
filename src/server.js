const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE.PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response); // Serve client.html
      break;
    case '/page2':
      htmlHandler.getClient2(request, response); // Serve client2.html
      break;
    case '/page3':
      htmlHandler.getClient3(request, response); // Serve client3.html
      break;
    case '/party.mp4':
      mediaHandler.getParty(request, response); // Serve party.mp4
      break;
    case '/bling.mp3':
      mediaHandler.getBling(request, response); // Serve bling.mp3
      break;
    case '/bird.mp4':
      mediaHandler.getBird(request, response); // Serve bird.mp4
      break;
    default:
      htmlHandler.getIndex(request, response); // Default to client.html
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
