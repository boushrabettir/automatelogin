/**
 * Imports placed here
 */
// import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import dotenv from "dotenv";
dotenv.config();

// https://discord.com/developers/docs/resources/channel#create-message
const handler = async (r: Request): Promise<Response> => {
  const response = await fetch("", {
    method: "POST",
    headers: {
      Authorization: "",
      "Content-type": "application/json"
    }
  });

  return new Response(response.body, {});
}

/**
 * execute_discord_message sends the private discord message to the
 * user to authenticate the user
 */
const execute_discord_message = (username: string): string => {
  const DISCORD_URI = process.env.DISCORD_URI;

  const MESSAGE = `
   Please login through your school to verify your enrollment.\n
   Use the following command: **!verify [SCHOOL_EMAIL] [CWID]**\n
  `;
  const PAYLOAD = {
    "content": "**Welcome to [XYZ] professors server at CSUF!**",
    "tts": false,
    "embeds": [
      {
        "description": MESSAGE,
        "color": 0x05A3FF,
      }
    ],
    "components": [
      {
        "type": 1,
        "components": [
          {
            "type": 2,
            "style": 1,
            "label": "Verification",
            "custom_id": "TEST",
          }
        ]
      }
    ]
  };


  /* Send fetch request -above - deno D: - */
  /* Button interactivity */

  return "";
};

/**
 * authenticate_user_information authenticates user information
 * as well as their courses
 */
const authenticate_user_information = (user_input: string): string => {
  return "";
};

/**
 * determine_course_channel determines which courses
 * to show which discord channel as well as roles
 */
const determine_course_channel = (user_courses: Array<string>) => {};
