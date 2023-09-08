import { ContextMenuCommandBuilder, MessageCommandBuilder, RecipleModuleScript, SlashCommandBuilder } from 'reciple';
import { ApplicationCommandType } from 'discord.js';
import { Login } from './events/Login.js';
import { EmbedBuilder } from "discord.js";
import { retrieveCatPhoto } from './Utils/Utils.js';
import { User } from './Utils/Interfaces.js';
import { chooseResponse } from './Utils/Text.js';
import { Interaction } from './events/Interact.js';
import { determineCourses } from './Canvas/Canvas.js';
export let userInstance: User;

console.log(determineCourses());
// export default {
//     versions: ['^7'], 
    
//     commands: [

//         new ContextMenuCommandBuilder()
//             .setName(`Test Context Menu`)
//             .setType(ApplicationCommandType.Message)
//             .setExecute(async data => {
//                 await data.interaction.reply(`Hello!`);
//             }),

//         // Send !test to execute command
//         new MessageCommandBuilder()
//             .setName(`test`)
//             .setDescription(`Test message command`)
//             .setAliases(`t`)
//             .setExecute(async data => {
//                 await data.message.reply(`Test message command`);
//             }),
        

//         new SlashCommandBuilder()
//             .setName("register")
//             .setDescription("Register into your course(s) channel here!.")
//             .addStringOption(option => 
//                 option.setName("email")
//                 .setDescription("Please place your valid email here.")
//                 .setRequired(true)
//                 )
//             .addStringOption(option => 
//                 option.setName("cwid")
//                 .setDescription("Please place your CWID here.")
//                 .setRequired(true)
//                 )

//             .setCooldown(20)
//             .setExecute(async ({interaction, client}) => {
//               const { options } = interaction;
            
          
//               const EMAIL = options.getString("email");
//               const CWID = options.getString("cwid");
                
//             //   const conditions = [NAME, EMAIL, CWID];

//               if (EMAIL !== null && CWID !== null) {
//                 let response = new Interaction(EMAIL, CWID).validateInput();
//                 if (response) {
//                     const invalidResponseMessage = new EmbedBuilder()
//                         .setAuthor({name: `Uh oh, ${interaction.user.username}! We've run into some problems!☹️`})
//                         .setColor(0x0099FF)
//                         .setDescription(response)
        
//                         await interaction.reply({embeds: [invalidResponseMessage]});
                  
//                 } else {
//                     userInstance = new User(EMAIL, CWID);
            
//                     const catPhotoUrl = await retrieveCatPhoto();
                    
//                     const botImbedMessage = new EmbedBuilder()
//                         .setAuthor({name: `${interaction.user.username}, you've sucessfully logged in! 🤙`})
//                         .setDescription("Give the team a minute or two to process your login! 😀🥸 ")
//                         .setColor(0x0099FF)
//                         .setImage(catPhotoUrl)
//                         .setTimestamp()
//                         .setFooter({ text: chooseResponse() })
                        

//                         await interaction.reply({embeds: [botImbedMessage]});
//                 }
//              }
//             }),
//     ],

    
    
//     // Module resolved logic here (Bot not logged in)
//     onStart(client) {
//         return true;
//     },

//     // Module loaded logic here (Bot logged in)
//     onLoad(client, module_) {},

//     // Unload logic here
//     onUnload({ reason, client }) {}
// } satisfies RecipleModuleScript;

