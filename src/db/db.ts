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
        if(this.users.some((userInDb) => userInDb.id === user.id)) {
            return false;
        } else {
            const res = [...this.users, user];
            this.users = res;
            return true;
        }
    };
    
    public updateUser = (id: string, user: IUser) => {
        const userToUpdate = this.users.findIndex((userInArr) => userInArr.id === id);
        
        if (userToUpdate >= 0) {
            this.users[userToUpdate].username = user.username;
            this.users[userToUpdate].age = user.age;
            this.users[userToUpdate].hobbies = user.hobbies;
            return true;
        } else {
            return false;
        }
    };

    public deleteUser = (id: string) => {
        if (this.users.some((userInDb) => userInDb.id === id)) {
            const res = this.users.filter((user) => id !== user.id);
            this.users = res;
            return true;
        } else {
            return false;
        }
        
    };
};

export const db = new Database();
