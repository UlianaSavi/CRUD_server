import { IUser } from "../models/users.model";

class Database {
    private users: IUser[];

    constructor() {
        this.users = [
            {
                id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
                username: 'Bladimir',
                age: 17,
                hobbies: []
            },
            {
                id: '2b9d2bfd-bbfd-4b2d-9b5d-ab8dfbbd4bbd',
                username: 'Evgenii',
                age: 24,
                hobbies: []
            }
        ];
    }

    public getAll = () => this.users;
    
    public getUserById = (id: string) => {
        return this.users.find((user) => id === user.id) || null;
    };
    
    public createNewUser = (user: IUser) => {
        const res = [...this.users, user];
        this.users = res;
    };
    
    public updateUser = (id: string, user: IUser) => {
        const userToUpdate = this.users.findIndex((user) => id === user.id) || null;
        if (userToUpdate) {
            this.users[userToUpdate] = user;
        } else {
            return null;
        }
    };
    
    public deleteUser = (id: string) => {
        this.users.filter((user) => id !== user.id);
    };
};

export const db = new Database();
