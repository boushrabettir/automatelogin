import { ContextMenuCommandBuilder, MessageCommandBuilder, RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { ApplicationCommandType } from 'discord.js';
import { EmbedBuilder } from "discord.js";
import { retrieveCatPhoto } from './Utils/Utils.js';
import { User } from './Utils/Interfaces.js';
import { chooseResponse } from './Utils/Text.js';
import { Interaction } from './events/Interact.js';
import { determineCourses } from './Canvas/Canvas.js';
export let userInstance: User;

console.log(determineCourses());
export default {
    versions: ['^7'], 
    
    commands:  [
        new SlashCommandBuilder()
            .setName("register")
            .setDescription("Register to see your courses channels.")
            .addStringOption(option => 
                option.setName("token")
                .setDescription("Place your canvas token here.")
                .setRequired(true)
                )
            .addStringOption(option => 
                option.setName("temp")
                .setDescription("Place your classes token here.")
                .setRequired(true)
                )
            .setCooldown(10)
            .setExecute(async ({interaction, client}) => {
              const { options } = interaction;
              
              const TOKEN = options.getString("token");
              
              // TODO - Validate Token
              if (TOKEN !== null) new User(TOKEN);
              
              const botImbedMessage = new EmbedBuilder()
                .setAuthor({name: `${interaction.user.username}, you've sucessfully logged in! 🤙`})
                .setDescription("### Please wait two to three minutes to have access to your courses! 😀\nMeanwhile, enjoy this cat photo below!😸")
                .setColor(0x0099FF)
                .setImage(await retrieveCatPhoto())
                .setTimestamp()
                .setFooter({ text: chooseResponse() });

                await interaction.reply({embeds: [botImbedMessage]});
            }),
            
    ],

    
    
    // Module resolved logic here (Bot not logged in)
    onStart(client) {
        return true;
    },

    // Module loaded logic here (Bot logged in)
    onLoad(client, module_) {},

    // Unload logic here
    onUnload({ reason, client }) {}
} satisfies RecipleModuleScript;

