import { Error } from "./ErrorHandling.js";

export const retrieveCatPhoto = async (): Promise<string> => {

    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        let data = await response.json();
        let imgUrl = data[0].url
        return imgUrl;


    } catch (err) {
        console.error(err);
        throw err;
    }

}   

export const setEnvVariable = () => {
    const DISCORD_TOKEN = process.env.TOKEN;
    const CANVAS_TOKEN = process.env.CANVAS_TOKEN;
    const COURSES = process.env.COURSE_NAMES;

    const finalEnvVariables = [DISCORD_TOKEN, CANVAS_TOKEN, COURSES]

    const determineValidility = finalEnvVariables.every((envVar) => envVar !== undefined);
    
    if (determineValidility === false) throw new Error().envError();
}