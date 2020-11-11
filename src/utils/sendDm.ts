import { User } from "discord.js";

export const sendDm = async (user: User, dm: string) => {
  try {
    const dmChannel = await user.createDM();

    dmChannel.send(dm);
  } catch (e) {
    console.error(e);
  }
};
