import { retrieveData } from "../Utils/Utils.js";

const stringCombination = (): string => {
    let stringValue = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    return stringValue;
}

const numberCombination = (): string => {
    let numValue = Math.floor(Math.random() * 50000);
    return numValue.toString();
}

const renameKeys = (currObject: any, newKey: string, oldKey: any) => {
  console.log(currObject, newKey, oldKey);
  currObject[newKey] = currObject[oldKey[0]];
  delete currObject[oldKey[0]]
}
/**
 * setNewKeys sets a new combination key
 * cycling every semester (4 months)
 */
export const setNewKeys = () => {

    let CLASS_DATA = [retrieveData()["CLASS_DATA"]];
    let newKey = `${stringCombination()}${numberCombination()}`;
  
    CLASS_DATA.forEach((obj: any)  =>  renameKeys(obj, newKey, Object.keys(obj)));
    // Object.entries(CLASS_DATA).forEach(
    //   ([key, value]) => {
    //     let newKey = `${stringCombination()}${numberCombination()}`;
    //     CLASS_DATA["CLASS_DATA"][newKey] = value;
    //     delete CLASS_DATA["CLASS_DATA"][key];
    //   }
    // );
    console.log("New class data", CLASS_DATA);
}