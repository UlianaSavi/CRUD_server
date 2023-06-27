import { IncomingMessage, ServerResponse } from "http";
import { db } from "../db/db";
import { IUser } from "../models/users.model";
import { IRequestWithBody } from "../models/requestWithBody";
import { UUID_REGEXP } from "../constants";

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
        if (this.id && this.id?.match(UUID_REGEXP)) {
            const data = db.getUserById(this.id);
            if (data) {
                this.res.statusCode = 200;
                this.res.end(JSON.stringify(data));
            } else {
                this.res.statusCode = 404;
                this.res.end(`Wrong id. User with ${ this.id } does not exist!`)
            }
        } else {
            this.res.statusCode = 400;
            this.res.end(`This id - not UUID format!`);
        }
        
    };

    createNewUser = () => {
        if (this.user) {
            const res = db.createNewUser(this.user);
            if (res) {
                this.res.statusCode = 200;
                this.res.end(`New user with id ${ this.user.id } created!`);
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
        if (this.id && this.user && this.id?.match(UUID_REGEXP)) {
            const res = db.updateUser(this.id, this.user);
            if (res) {
                this.res.statusCode = 200;
                this.res.end(`User with id ${ this.id } updated!\nUser: ${ JSON.stringify(this.user) }`)
            } else {
                this.res.statusCode = 404; 
                this.res.end(`User with id ${ this.id } does not exist!`)
            }
        } else {
            this.res.statusCode = 400;
            this.res.end(`This id - not UUID format!`);
        }
    };

    deleteUser = () => {
        if (this.id && this.id?.match(UUID_REGEXP)) {
            const res = db.deleteUser(this.id)
            if (res) {
                this.res.end(`User with id ${ this.id } deleted!`);
                this.res.statusCode = 204;
            } else {
                this.res.statusCode = 404;
                this.res.end(`User with id ${ this.id } not found!`);
            }
        } else {
            this.res.statusCode = 400;
            this.res.end(`This id - not UUID format!`);
        }
    };
}