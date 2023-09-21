import { Error } from "./ErrorHandling.js";
import fs from 'fs';
import { stringCombination, numberCombination } from "../Flow/Flow.js";

/**
 * retrieveCatPhoto calls a cat api
 * to retrieve a random cat photo 
 * @returns The photo URL from the response data
 */
export const retrieveCatPhoto = async (): Promise<string> => {

    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        let data = await response.json();
        return data[0].url;
    } catch (err) {
        console.error(err);
        throw err;
    }

}   

/**
 * setEnvVariable throws an error
 * if any env variables are not set
 */
export const setEnvVariable = () => {
    const DISCORD_TOKEN = process.env.TOKEN;

    if (DISCORD_TOKEN === null) throw new Error().env();
}


/**
 * retrieveData retrieves the class data and its
 * needed information
 * @returns Returns a json object from 'data.json'
 */
export const retrieveData = (): any => {
    try {
        const jsonData = JSON.parse(fs.readFileSync("src/data.json", "utf-8"));
        return jsonData;
    } catch (err) {
        console.error("Error reading 'data.json':", err);
        throw err;
    }
}

/**
 * setClassType sets the professors class type for the semester
 * @param input The user's class type input
 */
export const setClassType = (input: string) => {
    const CLASS_DATA = retrieveData();

    CLASS_DATA["CLASS_TYPE"]["type"] = input;

    fs.writeFileSync('src/data.json', JSON.stringify(CLASS_DATA));
}

/**
 * setClassName creates a new key/pair value where the
 * key is the class ID combination and the value is the class name
 * @param input The user's class name input
 */
export const setClassName = (input: string) => {
    const CLASS_DATA = retrieveData();

    if (!(input in Object.values(CLASS_DATA["CLASS_DATA"]))) {
        let newKey = `${stringCombination()}${numberCombination()}`;
        CLASS_DATA["CLASS_DATA"][newKey] = input;
    }

    fs.writeFileSync('src/data.json', JSON.stringify(CLASS_DATA));

}