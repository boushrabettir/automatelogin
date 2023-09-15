/**
 * Error is a custom class for
 * custom error handling/messages
 */
export class Error {
    /**
     * env throws an error if the proper enviornment variables
     * have not been set
     * @returns The custom error for env
     */
    public env(): string {
        return "Please set the required env variables before continuing."
    }

    /**
     * token throws an error if the users input token
     * is not valid
     * @returns The custom error for token
     */
    public token(): string {
        return "Your **TOKEN** is not valid. Please contact your teacher if the issue persists. 😎"
    }
}
