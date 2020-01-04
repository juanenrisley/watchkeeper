const init = require('../app');
const http = require('http');

http.get('http://localhost:8080', res => console.log(res));
init({liveAction: () => Math.floor((Math.random() * 100) + 1) % 2});
