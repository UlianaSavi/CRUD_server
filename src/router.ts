import { IncomingMessage, ServerResponse } from 'http';
import { UserRouter } from './routes/user.route';
import { BASE } from './constants';
import { IRequestWithBody } from './models/requestWithBody';

export class Router {

    constructor() {}

    public static route = (reqWithBody: IRequestWithBody, res: ServerResponse<IncomingMessage>) => {
        const url = reqWithBody.req?.url?.match('/api/users')?.at(0);

        switch (url) {
            case BASE +'/users':
                return UserRouter.route(reqWithBody, res);
            }
        return null;
    }
}