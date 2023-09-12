import { PermissionsBitField, Role } from "discord.js";
import { Error } from "./ErrorHandling.js";
import { Permissions, PermissionFlags } from "discord.js";

/**
 * retrieveCatPhoto calls a cat api
 * to retrieve a random cat photo 
 */
export const retrieveCatPhoto = async (): Promise<string> => {

    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
        let data = await response.json();
        return data[0].url
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
    // const COURSES = process.env.COURSE_NAMES;
    const TEMP = process.env.TEMP;

    const finalEnvVariables = [DISCORD_TOKEN, TEMP]
    const determineValidility = finalEnvVariables.every((envVar) => envVar !== undefined);
    
    if (determineValidility === false) throw new Error().env();
}


const createRole = async (role: string, id: string, interaction: any, channelId: string) => {


    const roleName = `${role}-${id}`; 

    const newRole = await interaction.guild?.roles.create({
        name: roleName,
        color: "#0080FF",
        permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    });
    

    // await interaction.guild?.channels.cache.get(channelId)?.permissonOverwrites.edit(role, {
    //     VIEW_CHANNEL: true,
    // });

 
    await interaction.guild?.roles.fetch();
    return newRole.id;
}


export const findRole = async (role: string, id:string, interaction: any, channelId: string): Promise<any> => {

    const doesRoleExist = interaction.guild?.roles.cache.find((r: any) => r.name === `${role}-${id}`);
    let roleId: string = "";

    if (!doesRoleExist) {
        roleId = await createRole(role, id, interaction, channelId);
    }
    
    return roleId;
}
