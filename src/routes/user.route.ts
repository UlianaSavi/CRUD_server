import { ROUTES } from "../constants";
import { IncomingMessage, ServerResponse } from 'http';
import * as Database from '../db/db';

export class UserRouter {
    public static route = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        const method = req?.method || '';
        
        switch (method) {
            case ROUTES.GET_USERS:
                const data = Database.getAll();
                break;
            case ROUTES.GET_USERBYID:
                Database.getUserById();
                break;
            case ROUTES.CREATE_USER && method === 'POST':
                Database.createNewUser();
                break;
            case ROUTES.UPDATE_USER && method === 'PUT':
                Database.updateUser();
                break;
            case ROUTES.DELETE_USER && method === 'DELETE ':
                Database.deleteUser();
                break;
        }
    };
}