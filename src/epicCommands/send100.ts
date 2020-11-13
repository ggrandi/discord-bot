import { Message } from "discord.js";
import { sleep } from "../utils/sleep";

export const action = async (msg: Message, args: string) => {
  for (let i = 0; i < 100; i++) {
    await msg.channel.send(args === "count" ? i : args);
    await sleep(500);
  }
};

export const description =
  "sends 100 messages to the channel (ex. !send100 <message here>)";
