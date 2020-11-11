import { ImportAction } from "../utils/genericCommands";
import { client } from "../client";
import { Message } from "discord.js";
import { sendDm } from "../utils/sendDm";

export const banOrKick = (action: "ban" | "kick"): ImportAction => ({
  async action(msg: Message) {
    const user = msg.mentions.users.first();

    if (!user) {
      msg.reply(`please include a user (ex. !${action} @user#0001)`);
    } else if (user.id === msg.author.id) {
      msg.reply(`You cannot ${action} yourself`);
    } else if (client.user?.id === user.id) {
      msg.reply(
        `You cannot ${action} this bot, remove it from the server manually`
      );
    } else {
      try {
        const member = msg.guild?.member(user);
        if (!member) {
          throw new Error(`invalid member ${user}`);
        }

        await member[action]();

        msg.reply(
          `successfully ${action === "ban" ? "banned" : "kicked"} ${user}`
        );
      } catch (e) {
        console.error(e);
        sendDm(
          msg.author,
          `Failed to ${action} ${user} from server ${msg.guild?.name}\n`
        );
      }
    }
  },

  description: `${action} a user (ex. !ban @user#0001)`,
});
