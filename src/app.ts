import http from 'http';
import dotenv from 'dotenv';
dotenv.config()

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${ hostname }:${ port }/`);
});