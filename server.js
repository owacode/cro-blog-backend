const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const port = process.env.PORT || 3000;
if(cluster.isMaster) {
console.log(`Master ${process.pid} is running`);
for (let i = 0; i < numCPUs; i++) {
cluster.fork();
}
cluster.on('exit', (worker, code, signal) => {
console.log(`worker ${worker.process.pid} died`);
  });
}
else{
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
console.log(`Worker ${process.pid} started`);
}

console.log("Listening on Port : "+port);
