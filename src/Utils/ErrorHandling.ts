/**
 * Error is a custom class for
 * custom error handling/messages
 */
export class Error {
    public env(): string {
        return "Please set the required env variables before continuing."
    }

    public token(): string {
        return "Your token is not valid, please try again."
    }
    // TODO
}
