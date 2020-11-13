import { Message, TextChannel } from "discord.js";
import { sendDm } from "../utils/sendDm";

interface Confirmation {
  userId: string;
  time: number;
}

const confirmationMap = new Map<string, Confirmation>();

export const action = async (msg: Message, args: string): Promise<void> => {
  if (msg.channel instanceof TextChannel) {
    const channelId = msg.channel.id;

    const confirmation = confirmationMap.get(channelId);

    const clear = async () => {
      const result = await (msg.channel as TextChannel).bulkDelete(100);

      const channelName = msg.guild?.channels.cache.get(msg.channel.id)?.name;

      const dms = await sendDm(
        msg.author,
        `cleared all messages in ${channelName || "the channel"}`
      );

      if (dms) {
        dms.send(`|| ${result.toJSON()} ||`);
      }
    };

    if (confirmation && msg.author.id === confirmation.userId) {
      if (args.startsWith("confirm")) {
        await clear();
        confirmationMap.delete(channelId);
      } else {
        msg.reply("please confirm the deletion with `!clearChannel confirm`");
      }
    } else {
      if (args.startsWith("confirm")) {
        await clear();
      } else {
        confirmationMap.set(channelId, {
          time: Date.now(),
          userId: msg.author.id,
        });

        msg.reply(
          `confirm the clearing of this channel with \`!clearChannel confirm\``
        );
      }
    }

    for (const [key, { time }] of confirmationMap.entries()) {
      if (Date.now() - time > 1000 * 60 * 10) {
        confirmationMap.delete(key);
      }
    }
  }
};

export const description =
  "clears the 100 most recent messages from the current channel";
