import { ROUTES } from "../constants";
import { IncomingMessage, ServerResponse } from 'http';
import { Database } from "../db/db";

const db = new Database();

export class UserRouter {
    public static route = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        const method = req?.method || '';
        
        switch (method) {
            case ROUTES.GET_USERS:
                const data = db.getAll();
                break;
            case ROUTES.GET_USERBYID:
                db.getUserById();
                break;
            case ROUTES.CREATE_USER && method === 'POST':
                db.createNewUser();
                break;
            case ROUTES.UPDATE_USER && method === 'PUT':
                db.updateUser();
                break;
            case ROUTES.DELETE_USER && method === 'DELETE ':
                db.deleteUser();
                break;
        }
    };
}