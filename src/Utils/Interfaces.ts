/**
 * Course defines the data for
 * the specific course
 */
export interface Course {
    name: string;
}

/**
 * User is a custom user class holding 
 * the users unique token
 */
export class User {
    private token: string;

    public constructor(token: string) { this.token = token; }

    public getToken(): string { return this.token; }
}