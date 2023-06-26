import http from 'http';
import dotenv from 'dotenv';
import cluster from 'node:cluster';
import { Router } from './router';
import { processReq } from './utils/processReq';
import { availableParallelism as numCPUs } from 'node:os';
import { HOSTNAME } from './constants';

dotenv.config();
const port = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000;

export const startCluster = () => {
    if (cluster.isWorker) {

        const server = http.createServer(async (req, res) => {
            const reqWithBody = await processReq(req, res);
            Router.route(reqWithBody, res);
        });

        server.listen(port, HOSTNAME, () => {
            console.log(`Server running at http://${ HOSTNAME }:${ port }/`);
        });

        server.on('error', (err: Error) => console.log(`Operation failed!\n${ err.message }`));
    } else {
        for (let i = 0; i < numCPUs(); i++) {
            cluster.fork({
                SERVER_PORT: port + i
            })
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${ worker.process.pid } dead.`);
        });
    }
}