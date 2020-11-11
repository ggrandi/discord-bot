import { Message } from "discord.js";

export default async (msg: Message, args: string[]): Promise<void> => {
  const user = msg.mentions.users.first();

  if (!user) {
    msg.reply(`please include a user (ex. !kick @user#0001)`);
    return;
  }

  msg.reply(`kicking user @${user.tag}`);
};

export const description = "kick a user (ex. !kick @user#0001)";
