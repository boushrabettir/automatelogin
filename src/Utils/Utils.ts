import { PermissionsBitField, Role } from "discord.js";
import { Error } from "./ErrorHandling.js";

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
    const CLASS_DATA = process.env.CLASS_DATA;

    const finalEnvVariables = [DISCORD_TOKEN, CLASS_DATA]
    const determineValidility = finalEnvVariables.every((envVar) => envVar !== undefined);
    
    if (determineValidility === false) throw new Error().env();
}


const createRole = async (role: string, id: string, interaction: any, channelId: string, classType: string) => {
    
    console.log(classType, role, id)
    const roleName = `${classType}${role}-${id}`; 

    const newRole = await interaction.guild?.roles.create({
        name: roleName,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
    });

    await interaction.guild?.roles.fetch();
    return newRole.id;
}


export const findRole = async (role: string, id:string, interaction: any, channelId: string, classType: string): Promise<string> => {

    const doesRoleExist = interaction.guild?.roles.cache.find((r: any) => r.name === `${classType}${role}-${id}`);
    let roleId: string = "";
    
    if (!doesRoleExist) {
        roleId = await createRole(role, id, interaction, channelId, classType);
    } else {
        roleId = doesRoleExist.id;
    }

    return roleId;
}

const createChannel = async (channelName: string, interaction: any, classType: string, roleId: string) => {

    const newChannel = await interaction.guild?.channels.create({
        name: `${classType}-${channelName}`,
        permissionOverwrites: [
            {
                id: roleId,
                permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: interaction.guild?.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
            }
        ]
    });

    await interaction.guild?.roles.fetch();

    return newChannel.id;
}

export const findChannel = async (role: string, interaction: any, classType: string, roleId: string) => {

    const doesChannelExist = interaction.guild?.channels.cache.find((c: any) => c.name === `${classType}-${role}`);
    
    let channelId: string = "";

    if (!doesChannelExist) {
        channelId = await createChannel(role, interaction, classType, roleId);
    } else {
        channelId = doesChannelExist.id;
    }

}