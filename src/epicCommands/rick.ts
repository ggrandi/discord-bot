import { Message } from "discord.js";

const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default async (msg: Message) => {
  msg.channel.send(`@everyone || ${link} ||`);
};

export const description = "It is very epic";
