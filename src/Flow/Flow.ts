import { retrieveData } from "../Utils/Utils.js";
import * as fs from "fs";


/**
 * stringCombination produces a string combination for the new key
 * @returns The new string combination
 */
export const stringCombination = (): string => {
    let stringValue = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    return stringValue;
}


/**
 * numberCombination produces a number combination for the new key
 * @returns The new number combination
 */
export const numberCombination = (): string => {
    let numValue = Math.floor(Math.random() * 50000);
    return numValue.toString();
}

/**
 * renameKeys removes the current key and updates it with the new
 * class key
 * @param currObject The current class object 'data.json'
 * @param newKey The new combination from stringCombination() and numberCombination()
 * @param oldKey The old key from 'CLASS_DATA' in currObject
 */
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

    fs.writeFileSync('src/data.json', JSON.stringify(CLASS_DATA));
}


setNewKeys();