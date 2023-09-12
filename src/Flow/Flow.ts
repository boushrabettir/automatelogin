import { setEnvVariable } from "../Utils/Utils.js";

const stringCombination = (): string => {
    let stringValue = (Math.random() + 1).toString(36).substring(7).toUpperCase()
    return stringValue;
}

const numberCombination = (): string => {
    let numValue = Math.floor(Math.random() * 50000);
    return numValue.toString();
}

/**
 * setNewKeys sets a new combination key
 * cycling every semester (4 months)
 */
export const setNewKeys = () => {
    setEnvVariable();

    let TEMP = JSON.parse(process.env.TEMP || "{}");
    
    Object.entries(TEMP).forEach(
      ([key, value]) => {
        let newCombination = `${stringCombination()}${numberCombination()}`;
        console.log(key, value, newCombination);
        key = newCombination;
        console.log(key, value, newCombination);
      }
    );   
}