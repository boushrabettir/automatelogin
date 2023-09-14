import { retrieveData } from "../Utils/Utils.js";
import fs from "fs";

const stringCombination = (): string => {
    let stringValue = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    return stringValue;
}

const numberCombination = (): string => {
    let numValue = Math.floor(Math.random() * 50000);
    return numValue.toString();
}

const renameKeys = (currObject: any, newKey: string, oldKey: any) => {
  currObject[newKey] = currObject[oldKey];
  delete currObject[oldKey]
}
/**
 * setNewKeys sets a new combination key
 * cycling every semester (4 months)
 */
export const setNewKeys = () => {

    
    let CLASS_DATA = retrieveData();

    let newKey = `${stringCombination()}${numberCombination()}`;
  
    for (const oldKey in CLASS_DATA.CLASS_DATA) {
        renameKeys(CLASS_DATA.CLASS_DATA, newKey, oldKey);
    }


    fs.writeFileSync('src/potato.json', JSON.stringify(CLASS_DATA));

    console.log("New class data", CLASS_DATA);
}