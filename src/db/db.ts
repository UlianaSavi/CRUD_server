import { IUser } from "../models/users.model";
import { v4 as uuidv4 } from 'uuid';

const users: IUser[] = [
    {
        id: uuidv4(),
        username: 'string',
        age: 123,
        hobbies: []
    },
];

export const getAll = () => {
    return users;
};

export const getUserById = () => {};

export const createNewUser = () => {};

export const updateUser = () => {};

export const deleteUser = () => {};
