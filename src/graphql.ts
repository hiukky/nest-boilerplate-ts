
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    name: string;
    email: string;
}

export interface IQuery {
    users(): UserEntity[] | Promise<UserEntity[]>;
    showUser(): UserEntity | Promise<UserEntity>;
}

export interface IMutation {
    createUser(input?: CreateUserInput): UserEntity | Promise<UserEntity>;
    updateUser(id: string, input?: CreateUserInput): UserEntity | Promise<UserEntity>;
    deleteUser(id: string): number | Promise<number>;
}

export interface UserEntity {
    id: string;
    name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
}
