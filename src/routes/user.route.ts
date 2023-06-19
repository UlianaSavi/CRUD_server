import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from "../services/user.service";
import { IRequestWithBody } from '../models/requestWithBody';
export class UserRouter {
    public static route = (reqWithBody: IRequestWithBody, res: ServerResponse<IncomingMessage>) => {
        const method = reqWithBody.req?.method || '';
        const url = reqWithBody.req?.url?.match('/api/users')?.at(0);
        const id = reqWithBody.req?.url?.slice(11) || null;
        
        const servise = new UserService(reqWithBody, res);

        if (url && method === 'GET' && !id) {
            servise.getAll();
        } else if (url && method === 'GET' && id) {
            console.log('GET_USERBYID');
            servise.getUserById();
        } else if (url && method === 'POST') {
            console.log('CREATE_USER');
            servise.createNewUser();
        } else if (url && method === 'PUT' && id) {
            console.log('UPDATE_USER');
            servise.updateUser();
        } else if (url && method === 'DELETE' && id) {
            console.log('DELETE_USER');
            servise.deleteUser();
        }
    };
}