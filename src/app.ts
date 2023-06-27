import http from 'http';
import dotenv from 'dotenv';
import { Router } from './router';
import { startCluster } from './cluster';
import { processReq } from './utils/processReq';
import { HOSTNAME } from './constants';

dotenv.config();
const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;

if (process.env.NODE_ENV === 'multi') {
  startCluster();
} else {
  const server = http.createServer(async (req, res) => {
    const reqWithBody = await processReq(req, res);
    Router.route(reqWithBody, res);
});

server.listen(port, HOSTNAME, () => {
    console.log(`Server running at http://${ HOSTNAME }:${ port }/`);
});
}
