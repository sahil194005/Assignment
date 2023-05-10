const http = require('http');
const httpProxy = require('http-proxy');
const cluster = require('cluster');
const os = require('os');

const PORT = process.env.PORT || 4000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const proxy = httpProxy.createProxyServer();

  // Round-robin algorithm
  let currentWorker = 0;
  const server = http.createServer((req, res) => {
    const workerId = (currentWorker % numCPUs) + 1;
    const target = `http://localhost:${PORT + workerId}`;

    console.log(`Routing request to worker ${workerId} at ${target}`);
    proxy.web(req, res, { target });

    currentWorker += 1;
  });

  server.listen(PORT, () => {
    console.log(`Load balancer is running on port ${PORT}`);
  });

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  require('./server'); // This is your existing server file
  console.log(`Worker ${process.pid} started, listening on port ${PORT + cluster.worker.id}`);
}
