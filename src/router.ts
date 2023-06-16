import { IncomingMessage, ServerResponse } from 'http';
import { UserRouter } from './routes/user.route';

export class Router {
    private static BASE = 'api';

    constructor() {}

    public static route = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        const route = Router.BASE + req?.url || '';

        switch (route) {
            case 'user':
                return UserRouter.route(req, res);
            }
        return null;
    }
}