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
        this.user = null;
        this.id = reqWithBody.req?.url && reqWithBody.req?.url?.length > 11  ? reqWithBody.req?.url?.slice(11) : null;
        this.req = reqWithBody;
        this.res = res;

        if(this.req.body) {
            this.user = JSON.parse(this.req.body); 
        } else {
            this.user = null;
        }
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
                this.res.end(`Wrong id. User with ${ this.id } does not exist!`)
            }
        }
    };

    createNewUser = () => {
        if (this.user) {
            const res = db.createNewUser(this.user);
            if (res) {
                this.res.statusCode = 200;
                this.res.end(`New user with id ${ this.id } created!`);
            } else {
                this.res.statusCode = 404;
                this.res.end('User with this id already exist!')
            }
        } else {
            this.res.statusCode = 400;
            this.res.end('Request body does not contain required fields!')
        }
    };

    updateUser = () => {
        if (this.id && this.user) {
            const res = db.updateUser(this.id, this.user);
            if (res) {
                this.res.statusCode = 200;
                this.res.end(`User with id ${ this.id } updated!`)
            } else {
                this.res.statusCode = 404; 
                this.res.end(`User with id ${ this.id } does not exist!`)
            }
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