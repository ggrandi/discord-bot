import { Message } from "discord.js";

export const replaceMentions = (msg: Message): string => {
  let m = msg.content;

  const { users, roles, channels } = msg.mentions;

  for (const [, user] of users) {
    m = m.replaceAll(`<@!${user.id}>`, `@${user.username}`);
  }

  for (const [, role] of roles) {
    m = m.replaceAll(`<@&${role.id}>`, `@${role.name}`);
  }

  for (const [, channel] of channels) {
    m = m.replaceAll(`<#${channel.id}>`, `#${channel.name}`);
  }

  return m;
};
