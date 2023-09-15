import fs from 'fs';
import { PermissionsBitField } from "discord.js";

export class Interact {

    public createRole = async (role: string, id: string, interaction: any, classType: string) => {
    
        const roleName = `${classType}${role}-${id}`; 
    
        const newRole = await interaction.guild?.roles.create({
            name: roleName,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        });
    
        await interaction.guild?.roles.fetch();
        return newRole.id;
    }
    
    
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
    
    
    public giveChannelAccess = async (roleId: any, interaction: any, channelName: string) => {
        console.log(roleId, channelName);
    
        const channel = interaction.guild?.channels.cache.find((c: any) => c.name == channelName);
        console.log(channel);
        
        if (channel) {
            await channel.permissionOverwrites.create(roleId, {permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]})
    
        }
    
    }
    
    public createChannel = async (channelName: string, interaction: any, classType: string) => {
    
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
    
        return newChannel.id;
    }
    
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

