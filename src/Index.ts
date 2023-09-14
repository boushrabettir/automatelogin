import { RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { EmbedBuilder } from "discord.js";
import { retrieveCatPhoto } from './Utils/Utils.js';
import { chooseResponse } from './Utils/Text.js';
import { Interact } from './events/Interact.js';
import { setEnvVariable, findRole, findChannel, retrieveData, giveChannelAccess } from './Utils/Utils.js';
import { setNewKeys } from './Flow/Flow.js';


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
                option.setName("section")
                .setDescription("Place your section number.")
                .setRequired(true)
                )
            .setCooldown(10)
            .setExecute(async ({interaction, client}) => {     
                const { options, user } = interaction;
                const TOKEN = options.getString("token");
                const SECTION = options.getString("section");
                // setEnvVariable();
                
                let CLASS_DATA = retrieveData();
 
                if (TOKEN !== null && CLASS_DATA && TOKEN in CLASS_DATA["CLASS_DATA"] && SECTION) {
                    
                    await findChannel(CLASS_DATA["CLASS_DATA"][TOKEN]["classID"], interaction, CLASS_DATA["CLASS_TYPE"]["type"]);

                    let newRoleId = await findRole(CLASS_DATA["CLASS_DATA"][TOKEN]["classID"], SECTION, interaction, CLASS_DATA["CLASS_TYPE"]["type"]);
                    const member = await interaction.guild?.members.fetch(user);
   
                    giveChannelAccess(newRoleId, interaction, `${CLASS_DATA["CLASS_TYPE"]["type"]}-${CLASS_DATA["CLASS_DATA"][TOKEN]["classID"]}`)

                    if (!member?.roles.cache.has(newRoleId)) {
                        await member?.roles.add(newRoleId);
                    }
                    
                    const botImbedMessage = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.username}, you've successfully registered! 💙🧡🤍`})
                        .setDescription(`You have been given access to **${(CLASS_DATA["CLASS_TYPE"]["type"]).toUpperCase()}-${CLASS_DATA["CLASS_DATA"][TOKEN]["classID"].toUpperCase()}!**\n*If there are any problems, please contact your professor.*`)
                        .setColor(0x0099FF)
                        .setImage(await retrieveCatPhoto())
                        .setTimestamp()
                        .setFooter({ text: chooseResponse() });

                    await interaction.reply({embeds: [botImbedMessage]});
                    
                } else {
                    const botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've run into a problem! 🧐`})
                    .setDescription(`Your **TOKEN** is not valid. Please contact your teacher if the issue persists. 😎`)
                    .setColor(0xCC0000)
                    .setTimestamp()

                    await interaction.reply({embeds: [botImbedMessage]});   
                }
            }),
            
    ],


    // Module resolved logic here (Bot not logged in)
    onStart(client) {
        const CHANNEL_ID = JSON.parse(process.env.CLASS_DATA || '{"token": []}')[2];
        const channel = client.channels.cache.get(CHANNEL_ID);
        console.log(channel);
        let message: string = "# Welcome to the main hub of your classes!\n **To Get Started**\n- `/register [TOKEN] [SECTION]` (E.g. /register ABC123 01)\n If you do NOT have your token, please contact your teacher to retrieve it."
        if (channel && channel.isTextBased()) channel.send(message)
        return true;
    },

    // Module loaded logic here (Bot logged in)
    onLoad(client, module_) {},

    // Unload logic here
    onUnload({ reason, client }) {}
} satisfies RecipleModuleScript;

