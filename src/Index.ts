import { RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { EmbedBuilder, MessageComponentBuilder } from "discord.js";
import { chooseResponse } from './Utils/Text.js';
import { Interact } from './Events/Interact.js';
import { setEnvVariable, retrieveData, setClassType, setClassName} from './Utils/Utils.js';
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
                
                setEnvVariable();

                let botImbedMessage: EmbedBuilder = new EmbedBuilder();
                
                const COURSE_TYPE = options.getString("type");
                const PROFESSOR_TOKEN = process.env.PROFESSOR_TOKEN?.toString();
                
                const member = await interaction.guild?.members.fetch(user);

                if (COURSE_TYPE && PROFESSOR_TOKEN && member?.roles.cache.has(PROFESSOR_TOKEN)) {
                    

                    setClassType(COURSE_TYPE);

                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've successfully added the course type!`})
                    .setDescription(`You added the course type: **${COURSE_TYPE?.toUpperCase()}**`)
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
            
            setEnvVariable();

            let botImbedMessage: EmbedBuilder = new EmbedBuilder();

            const COURSE_NUMBER = options.getString("course");
            const COURSE_DATA = retrieveData();
            const PROFESSOR_TOKEN = process.env.PROFESSOR_TOKEN?.toString();
            
            const member = await interaction.guild?.members.fetch(user);

            if (COURSE_NUMBER && PROFESSOR_TOKEN && member?.roles.cache.has(PROFESSOR_TOKEN)) {

                if (COURSE_DATA && COURSE_DATA["CLASS_DATA"]) {
                    setClassName(COURSE_NUMBER);

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

                let botImbedMessage: EmbedBuilder = new EmbedBuilder();

                const TOKEN = options.getString("token");
                const SECTION = options.getString("section");
                const CLASS_DATA = retrieveData();

 
                if (TOKEN  && SECTION && CLASS_DATA && TOKEN in CLASS_DATA["CLASS_DATA"]) {
                    
                    await new Interact().findChannel(CLASS_DATA["CLASS_DATA"][TOKEN], interaction, CLASS_DATA["CLASS_TYPE"]["type"]);
                    
                    let newRoleId = await new Interact().findRole(CLASS_DATA["CLASS_DATA"][TOKEN], SECTION, interaction, CLASS_DATA["CLASS_TYPE"]["type"]);
                    
                    console.log("New role id", newRoleId);

                    const member = await interaction.guild?.members.fetch(user);

                    if (!member?.roles.cache.has(newRoleId)) {
                        await member?.roles.add(newRoleId);
                    } else {
                        botImbedMessage = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.username}, you've already registered! 💙🧡🤍`})
                        .setDescription(new Error().takenRole())
                        .setColor(0x0099FF)
                        .setTimestamp()
                        .setFooter({ text: chooseResponse() });

                        await interaction.reply({content: `<@${interaction.user.id}>`, embeds: [botImbedMessage]});
                        return;
                    }
       
                    await new Interact().giveChannelAccess(newRoleId, interaction, `${CLASS_DATA["CLASS_TYPE"]["type"]}-${CLASS_DATA["CLASS_DATA"][TOKEN]}`)
                    console.log("Given access is done!!");
                    console.log("Making message....");
                    botImbedMessage = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.username}, you've successfully registered! 💙🧡🤍`})
                        .setDescription(`You have been given access to **${(CLASS_DATA["CLASS_TYPE"]["type"]).toUpperCase()}-${CLASS_DATA["CLASS_DATA"][TOKEN].toUpperCase()}!**\n*If there are any problems, please contact your professor.*`)
                        .setColor(0x0099FF)
                        .setTimestamp()
                        .setFooter({ text: chooseResponse() });
                    console.log("Done making message....")
                    
                } else {
                    botImbedMessage = new EmbedBuilder()
                    .setAuthor({name: `${interaction.user.username}, you've run into a problem! 🧐`})
                    .setDescription(new Error().token())
                    .setColor(0xCC0000)
                    .setTimestamp();
                }
                console.log("Sending message....");
                await interaction.reply({content: `<@${user.id}>`, embeds: [botImbedMessage]});
                console.log("Done sending message....");
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

