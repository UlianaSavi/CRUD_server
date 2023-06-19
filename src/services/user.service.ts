import { IncomingMessage, ServerResponse } from "http";
import { db } from "../db/db";
import { IUser } from "../models/users.model";
import { IRequestWithBody } from "../models/requestWithBody";

export class UserService {
    user: IUser | null;
    id: string | null;
    req: IRequestWithBody;
    res: ServerResponse<IncomingMessage> ;

    constructor(reqWithBody: IRequestWithBody, res: ServerResponse<IncomingMessage> ) {
        this.user = JSON.parse(reqWithBody.body) || null;
        this.id = reqWithBody.req?.url && reqWithBody.req?.url?.length > 11  ? reqWithBody.req?.url?.slice(11) : null;
        this.req = reqWithBody;
        this.res = res;
    }

    getAll = () => {
        const data = db.getAll();
        this.res.statusCode = 200;
        this.res.end(JSON.stringify(data));
    };

    getUserById = () => {
        if (this.id) {
            const data = db.getUserById(this.id);
            if (data) {
                this.res.statusCode = 200;
                this.res.end(JSON.stringify(data));
            } else {
                this.res.statusCode = 404;
            }
        }
    };

    createNewUser = () => {
        if (this.user) {
            console.log('user: ', this.user);
            db.createNewUser(this.user)
            this.res.statusCode = 200;
            this.res.end(`New user with id ${ this.user.id } created!`);
        } else {
            this.res.statusCode = 404;
        }
    };

    updateUser = () => {
        if (this.id && this.user) {
            db.updateUser(this.id, this.user);
        }
    };

    deleteUser = () => {
        if (this.id) {
            db.deleteUser(this.id)
            this.res.statusCode = 200;
            this.res.end(`User with id ${ this.id } deleted!`);
        } else {
            this.res.statusCode = 404;
        }
    };
}