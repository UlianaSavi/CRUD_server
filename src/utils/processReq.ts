import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../models/users.model";
import { IRequestWithBody } from "../models/requestWithBody";

export const processReq = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    return new Promise((resolve: (value: IRequestWithBody) => void, reject: (reason?: string) => void) => {
        const chunks: Buffer[] = [];
        let body = '';
        let reqWithBody: IRequestWithBody = { req: req, body: '' };
        req.on('data', (chunk: Buffer, err: Error) => {
            if (err) {
                res.statusCode = 404;
                res.end(`Request body does not contain required fields! Error: ${ err }`);
                reject(`Request body does not contain required fields! Error: ${ err }`)
            } else {
                chunks.push(chunk);
            }
        });

        req.on('end', () => {
            const data: IUser = JSON.parse(Buffer.concat(chunks).toString());
            body = JSON.stringify(data);
            reqWithBody.body = body;
            resolve(reqWithBody);
                });
        });
  }