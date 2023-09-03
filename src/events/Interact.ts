export class Interaction {
    private email: string;
    private cwid: string;

    public constructor(email: string, cwid: string) {
        this.email = email;
        this.cwid = cwid;
    }


    public validateInput = (): boolean => {
        // TODO - Update this!!
        const csufEmailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;
        return true ? (this.cwid.length !== 9 || csufEmailPattern.test(this.email) === false) : false;
    }

}

