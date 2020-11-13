import { User } from "discord.js";

export const sendDm = async (user: User, dm?: string) => {
  try {
    const dmChannel = await user.createDM();

    if (dm) {
      dmChannel.send(dm);
    }

    return dmChannel;
  } catch (e) {
    console.error(e);
  }

  return null;
};
