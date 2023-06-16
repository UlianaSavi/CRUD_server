import { IUser } from "../models/users.model";
import { v4 as uuidv4 } from 'uuid';

export class Database {
    users: IUser[];

    constructor() {
        this.users = [
            {
                id: uuidv4(),
                username: 'string',
                age: 15,
                hobbies: []
            },
        ];
    }

    getAll = () => this.users;
    
    getUserById = () => {};
    
    createNewUser = () => {};
    
    updateUser = () => {};
    
    deleteUser = () => {};
};
