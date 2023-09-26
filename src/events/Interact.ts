import { PermissionsBitField } from "discord.js";

/**
 * Interact holds member functions to respond to a /register
 * command executed by the user
 */
export class Interact {

    /**
     * createRole creates a new role name if the name 
     * does not exist in the Discord server
     * @param role The class id located in 'data.json'
     * @param id The section number given by the user
     * @param interaction The interaction object from discord.js
     * @param classType The class type located in 'data.json'
     * @returns The role id number
     */
    public createRole = async (role: string, id: string, interaction: any, classType: string) => {
        const roleName = `${classType}${role}-${id}`; 
    
        const newRole = await interaction.guild?.roles.create({
            name: roleName,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        });
    
        await interaction.guild?.roles.fetch();

        console.log("Created new role in createRole function", newRole);
        return newRole.id;

        
    }
    
    /**
     * findRole determines if a role exists in the Discord Server
     * @param role The class id located in 'data.json'
     * @param id The section number given by the user
     * @param interaction The interaction object from discord.js
     * @param classType The class type located in 'data.json'
     * @returns The role id number
     */
    public findRole = async (role: string, id:string, interaction: any, classType: string): Promise<string> => {
    
        const doesRoleExist = interaction.guild?.roles.cache.find((r: any) => r.name === `${classType}${role}-${id}`);
        let roleId: string = "";
    
        if (!doesRoleExist) {
            roleId = await this.createRole(role, id, interaction, classType);
        } else {
            roleId = doesRoleExist.id;
        }
    
        return roleId;
    }
    

    /**
     * giveChannelAccess gives the created/found role access
     * @param roleId The roles id number obtained from creating/finding the role beforehand
     * @param interaction The interaction object from discord.js
     * @param channelName The channels name after creating/finding it beforehand
     */
    public giveChannelAccess = async (roleId: string, interaction: any, channelName: string) => {
        const channel = interaction.guild?.channels.cache.find((c: any) => c.name === channelName);
        
        if (channel) {
            // Find the role by ID
            const role = interaction.guild?.roles.cache.get(roleId);
    
            if (role) {
                channel.permissionOverwrites.create(role, {
                    ViewChannel: true,
                    SendMessages: true
                })
                .catch((error: any) => {
                    console.error(`Error granting access to ${roleId} for ${channelName}: ${error}`);
                });
            }
        }
    }
    
    
    /**
     * createChannel creates a new channel if not already created
     * @param channelName The channels name if it exists or not.
     * @param interaction The interaction object from discord.js
     * @param classType The class type located in 'data.json'
     * @returns The channel id number
     */
    public createChannel = async (channelName: string, interaction: any, classType: string): Promise<string> => {
        const newChannel = await interaction.guild?.channels.create({
            name: `${classType}-${channelName}`,
            permissionOverwrites: [
                {
                    id: interaction.guild?.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });
    
        await interaction.guild?.roles.fetch();
        console.log("Channel created");
        return newChannel.id;
    }
    
    /**
     * findChannel finds if the current channel exists
     * @param role The class id located in 'data.json'
     * @param interaction The interaction object from discord.js
     * @param classType The class type located in 'data.json'
     */
    public findChannel = async (role: string, interaction: any, classType: string) => {
        console.log(`${classType}-${role}`);
        const doesChannelExist = interaction.guild?.channels.cache.find((c: any) => c.name === `${classType}-${role}`);
        
        let channelId: string = "";
    
        if (!doesChannelExist) {
            channelId = await this.createChannel(role, interaction, classType);
        } else {
            channelId = doesChannelExist.id;
        }
    
    }

};

