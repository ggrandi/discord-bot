import { Message, MessageEmbedOptions, MessageOptions } from "discord.js";
import { randomChoice } from "../utils/randomChoice";
// import { sendDm } from "../utils/sendDm";

const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const options: MessageEmbedOptions[] = [
  {
    title: "Special Gift",
    url: link,
    description: "You've earned it!",
    color: "#ff0000",
    [randomChoice(["thumbnail", "image"])]: {
      url:
        "https://cdn.discordapp.com/attachments/675267715870621700/776490426336804864/image0.png",
    },
  },
  {
    title: "Cool Award",
    url: link,
    description: "Pick it up!",
    color: "#ff0000",
    [randomChoice(["image", "thumbnail"])]: {
      url:
        "https://cdn.discordapp.com/attachments/775819047111360543/776845360709500938/IMG_0400.JPG",
    },
  },
  {
    title: "Cool Award",
    url: link,
    description: "Pick it up!",
    color: "#ff0000",
    [randomChoice(["thumbnail", "image"])]: {
      url:
        "https://cdn.discordapp.com/attachments/775819047111360543/776867588478074890/Screen_Shot_2020-06-14_at_10.47.37.png",
    },
  },
];

export const action = async (msg: Message) => {
  const content: MessageOptions = {
    embed: randomChoice(options),
  };

  // const m = Array.from(msg.guild?.members.cache.values() || []);

  // for (const member of m) {
  //   const channel = await sendDm(member.user);
  //   if (channel) {
  //     channel.send(content);
  //   }
  // }

  msg.channel.send(content);
};

export const description = "It is very epic";
