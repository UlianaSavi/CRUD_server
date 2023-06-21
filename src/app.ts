import http from 'http';
import dotenv from 'dotenv';
import { Router } from './router';
import { processReq } from './utils/processReq';

dotenv.config();

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;

const server = http.createServer(async (req, res) => {
  const reqWithBody = await processReq(req, res);
  Router.route(reqWithBody, res);
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${ hostname }:${ port }/`);
});

server.on('error', (err: Error) => console.log(`Operation failed!\n${ err.message }`));
