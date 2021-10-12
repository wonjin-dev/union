const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);

server.listen(3000, function (){
    console.log('server');
});