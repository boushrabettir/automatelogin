import { RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { EmbedBuilder } from "discord.js";
import { retrieveCatPhoto } from './Utils/Utils.js';
import { User } from './Utils/Interfaces.js';
import { chooseResponse } from './Utils/Text.js';
import { Interact } from './events/Interact.js';
import { determineCourses } from './Canvas/Canvas.js';
import { setEnvVariable } from './Utils/Utils.js';
export let userInstance: User;

interface Role {
    token: string;
}

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
              const { options, user } = interaction;
              
              const TOKEN = options.getString("token");
              
              // TODO - Validate Token
              if (TOKEN !== null) new User(TOKEN);
              setEnvVariable();

              const TEMP: Role = JSON.parse(process.env.TEMP || "{}");
              // TODO
              const roleId = TEMP.token;
              try {

                const member = await interaction.guild?.members.fetch(user);

                if (!member?.roles.cache.has(roleId)) {
                    await member?.roles.add(roleId);
                }

                const botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've sucessfully logged in! 🤙`})
                    .setDescription("### Please wait two to three minutes to have access to your courses! 😀\nMeanwhile, enjoy this cat photo below!😸")
                    .setColor(0x0099FF)
                    .setImage(await retrieveCatPhoto())
                    .setTimestamp()
                    .setFooter({ text: chooseResponse() });

                    await interaction.reply({embeds: [botImbedMessage]});
              } catch (err) {

                const botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've run into a problem!`})
                    .setDescription("### Please wait a minute or two before trying again.\nIf this issue persists, please contact your teacher.")
                    .setColor(0x0099FF);

                await interaction.reply({embeds: [botImbedMessage]});

                console.error(err);
              }
            }),
            
    ],


    // Module resolved logic here (Bot not logged in)
    onStart(client) {
        const CHANNEL_ID = JSON.parse(process.env.DISCORD_TOKEN || "");
        const channel = client.channels.cache.get(CHANNEL_ID);
        
        let message: string = "# Welcome to the main hub of your classes!\n **To Get Started**\n- `/register [TOKEN] [SECTION]` (E.g. /register ABC123 01)\n If you do NOT have your token, please contact your teacher to retrieve it."
        if (channel && channel.isTextBased()) channel.send(message)
        return true;
    },

    // Module loaded logic here (Bot logged in)
    onLoad(client, module_) {},

    // Unload logic here
    onUnload({ reason, client }) {}
} satisfies RecipleModuleScript;

