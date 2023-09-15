import { RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { EmbedBuilder, MessageComponentBuilder } from "discord.js";
import { retrieveCatPhoto } from './Utils/Utils.js';
import { chooseResponse } from './Utils/Text.js';
import { Interact } from './events/Interact.js';
import { setEnvVariable, retrieveData } from './Utils/Utils.js';
import { Error } from './Utils/ErrorHandling.js';

export default {
    versions: ['^7'], 
    
    commands:  [

        new SlashCommandBuilder()
            .setName("add-type")
            .setDescription("Set your class type.")
            .addStringOption(option => 
                option.setName("type")
                .setDescription("The course type. E.g. 'cpsc'")
                .setRequired(true)
                )
            .setExecute(async ({interaction, client}) => {
                const { options, user } = interaction;
                
                let botImbedMessage: EmbedBuilder = new EmbedBuilder();
                
                const COURSE_NUMBER = options.getString("type");

                const prof = "1152071882305179678";
                
                const member = await interaction.guild?.members.fetch(user);

                if (member?.roles.cache.has(prof)) {

                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've successfully added the course type!`})
                    .setDescription(`You added the course type: **${COURSE_NUMBER?.toUpperCase()}**`)
                    .setColor(0x0099FF)
                    .setTimestamp();

                } else {
                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you're not an admin!`})
                    .setDescription(new Error().incorrectRole())
                    .setColor(0xCC0000)
                    .setTimestamp();         
                }

                await interaction.reply({ content: `<@${user.id}>`, embeds: [botImbedMessage]});   
            }),


        new SlashCommandBuilder()
            .setName("add-course")
            .setDescription("Add your new course.")
            .addStringOption(option => 
                option.setName("course")
                .setDescription("The course number excluding section number - E.g. '351'")
                .setRequired(true)
                )
        .setExecute(async ({interaction, client}) => {
            const { options, user } = interaction;
            
            let botImbedMessage: EmbedBuilder = new EmbedBuilder();
            // IF COURSE TYPE DOESNT EXIST THROW ERROR!!

            const COURSE_NUMBER = options.getString("course");
            const COURSE_DATA = retrieveData();

            const prof = "1152071882305179678";
            
            const member = await interaction.guild?.members.fetch(user);

            if (member?.roles.cache.has(prof)) {
                
                if (COURSE_DATA && COURSE_DATA["CLASS_TYPE"]["type"]) {
                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've successfully added a new course!`})
                    .setDescription(`You added the course: **${COURSE_NUMBER}**`)
                    .setColor(0x0099FF)
                    .setTimestamp();
                }  else {
                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've run into a problem!`})
                    .setDescription(new Error().addCourseType())
                    .setColor(0x0099FF)
                    .setTimestamp();
                }   
            } else {
                botImbedMessage = new EmbedBuilder()
                .setAuthor({name: `${interaction.user.username}, you're not an admin!`})
                .setDescription(new Error().incorrectRole())
                .setColor(0xCC0000)
                .setTimestamp();   
            }

            await interaction.reply({ content: `<@${user.id}>`, embeds: [botImbedMessage]});   

        }),


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

                let botImbedMessage: EmbedBuilder = new EmbedBuilder();

                setEnvVariable();
                
                let CLASS_DATA = retrieveData();
 
                if (TOKEN  && SECTION && CLASS_DATA && TOKEN in CLASS_DATA["CLASS_DATA"]) {
                    
                    await new Interact().findChannel(CLASS_DATA["CLASS_DATA"][TOKEN]["classID"], interaction, CLASS_DATA["CLASS_TYPE"]["type"]);

                    let newRoleId = await new Interact().findRole(CLASS_DATA["CLASS_DATA"][TOKEN]["classID"], SECTION, interaction, CLASS_DATA["CLASS_TYPE"]["type"]);
                    const member = await interaction.guild?.members.fetch(user);
   
                    new Interact().giveChannelAccess(newRoleId, interaction, `${CLASS_DATA["CLASS_TYPE"]["type"]}-${CLASS_DATA["CLASS_DATA"][TOKEN]["classID"]}`)

                    if (!member?.roles.cache.has(newRoleId)) {
                        await member?.roles.add(newRoleId);
                    }
                    
                    botImbedMessage = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.username}, you've successfully registered! 💙🧡🤍`})
                        .setDescription(`You have been given access to **${(CLASS_DATA["CLASS_TYPE"]["type"]).toUpperCase()}-${CLASS_DATA["CLASS_DATA"][TOKEN]["classID"].toUpperCase()}!**\n*If there are any problems, please contact your professor.*`)
                        .setColor(0x0099FF)
                        .setImage(await retrieveCatPhoto())
                        .setTimestamp()
                        .setFooter({ text: chooseResponse() });
                    
                } else {
                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've run into a problem! 🧐`})
                    .setDescription(new Error().token())
                    .setColor(0xCC0000)
                    .setTimestamp();
                }

                await interaction.reply({content: `<@${user.id}>`, embeds: [botImbedMessage]});
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

