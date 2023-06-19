import { IncomingMessage } from "http";

export interface IRequestWithBody {
    req: IncomingMessage;
    body: string | null;
}