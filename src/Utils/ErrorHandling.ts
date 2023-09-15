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

    /**
     * addCourseType throws an error if the course type
     * if it does not exist
     * @returns The custom error for course type
     */
    public addCourseType(): string {
        return "You must **add the course type** first before adding a course!\nUse the command **`/add-type [COURSE_TYPE]`** first before trying again!";
    }

    /**
     * incorrectRole throws an error if the user uses a 
     * command not applicable for them
     * @returns The custom error for incorrect role
     */
    public incorrectRole(): string {
        return "You do not have the permissions for this role."
    }
}
