import { genericCommands } from "../utils/genericCommands";

export const ownerMessage = genericCommands(
  [
    ["clearChannel", import("./clearChannel")],
    ["kick", import("./kick")],
    ["ban", import("./ban")],
  ],
  "owner commands:",
  (msg) => msg.guild?.ownerID === msg.author.id
);
