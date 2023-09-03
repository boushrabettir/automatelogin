export class Interaction {
    private email: string;
    private cwid: string;

    public constructor(email: string, cwid: string) {
        this.email = email;
        this.cwid = cwid;
    }


    public validateInput = (): string => {
        /**
          Validation of email and CWID?
          Tuff one here!
         */
        const csufEmailPattern = /^[a-zA-Z0-9._%+-]+@csu\.fullerton\.edu$/;
        let response = "";

        if (this.cwid.length !== 9) {
            response+="- Your **`cwid`** is not length of 9!🥲\n";
        }

        if (csufEmailPattern.test(this.email) === false) {
            response+="- Your **`email`** is not valid!😬\n"
        }

        return response
    }

}

