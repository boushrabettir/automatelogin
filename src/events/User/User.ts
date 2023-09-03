export class User {
    private email: string;
    private cwid: string;

    public constructor(email: string, cwid: string) {
        this.email = email;
        this.cwid = cwid;
    }

    public getEmail(): string { return this.email; }
    public getCwid(): string { return this.cwid; }
}