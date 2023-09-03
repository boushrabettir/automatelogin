import { AnyCommandBuilder, SlashCommandBuilder } from "reciple";
import { User } from "./User/User.js";
import { EmbedBuilder } from "discord.js";

// TODO place in index.ts

export class Login {
    public versions: Array<string> = ['^7'];
    commands: AnyCommandBuilder[] = [
        new SlashCommandBuilder()
            .setName("login")
            .setDescription("Login here.")
            .addStringOption(option => 
                option.setName("email")
                .setDescription("Please place your valid email here.")
                .setRequired(true)
                )
            .addStringOption(option => 
                option.setName("cwid")
                .setDescription("Please place your CWID here.")
                .setRequired(true)
                )
            .setCooldown(5)
            .setExecute(async ({interaction, client}) => {
              const { options } = interaction;
              
              const EMAIL = options.getString("email");
              const CWID = options.getString("cwid");
              if (EMAIL !== null && CWID !== null) {
                new User(EMAIL, CWID);
              } else {
                console.error("N/A");
              }


              const botImbedMessage = new EmbedBuilder()
                .setAuthor({name: "Your Results"})
                .setDescription(`Email: ${EMAIL}, Cwid: ${CWID}`);

                await interaction.reply({embeds: [botImbedMessage]});
              
            })
    ]
}