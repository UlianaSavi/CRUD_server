import http from 'http';
import dotenv from 'dotenv';
import { Router } from './router';

dotenv.config();

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;

const server = http.createServer((req, res) => {
  Router.route(req, res)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${ hostname }:${ port }/`);
});

server.on('clientError', (err: Error) => console.log(`Operation failed!\n${ err.message }`));
