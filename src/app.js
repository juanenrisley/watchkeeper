const http = require('http');

const createApp = ({liveAction, readyAction, startupAction}) =>
  http.createServer((request, response) => {
    let message;
    response.statusCode = 404;

    if (request.method === 'GET') {
      let result = false;

      switch (request.url) {
        case '/':
          message = 'Up and ready!';
          result = true;
          break;
        case '/live':
          result = !!liveAction && liveAction();
          message = result ? 'Live!' : 'Dead!';
          break;
        case '/ready':
          result = !!readyAction && readyAction();
          message = result ? 'Ready!' : 'Not ready!';
          break;
        case '/startup':
          result = !!startupAction && startupAction();
          message = result ? 'Started!' : 'Down!';
          break;
        default:
          message = 'Not found';
          break;
      }

      if (result) {
        response.statusCode = 200;
      }
    }

    response.end(message);
  });

module.exports = ({port = 8080, ...rest} = {}) => createApp(rest).listen(port);
