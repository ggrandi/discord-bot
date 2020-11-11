import { Client } from "discord.js";
import dotenv from "dotenv-safe";
import { epicCommands } from "./epicCommands";
import { ownerMessage } from "./ownerMessage";

dotenv.config();

export const client = new Client();

client.on("ready", () => {
  if (client.user) {
    console.log(`logged in as ${client.user.tag}`);
  } else {
    throw new Error("Not Logged in!");
  }
});

client.on("message", async (msg) => {
  // The message is a command
  if (msg.content.startsWith("!")) {
    const checkMsgFunctions = [ownerMessage, epicCommands];

    let l = 4;
    const list: ((l: number) => string)[][] = [
      [(m: number) => `\`!${"help".padEnd(m)} - sends you this menu\``],
    ];

    for (const func of checkMsgFunctions) {
      const value = await func(msg);

      if (value.success) {
        return;
      }

      const { maxLength, commands } = value;

      if (maxLength > l) {
        l = maxLength;
      }

      list.push(commands);
    }

    const reply: string[] = [];

    if (msg.content !== "!help") {
      reply.push(`\`${msg.content}\` is not a valid command`);
    }

    reply.push("Here is a list of all valid commands you can use: ");

    reply.push(
      ">>> " +
        list
          .flat()
          .map((v) => v(l))
          .join("\n")
    );

    msg.reply(reply.join("\n"));
  }

  if (Math.random() < 0.02) {
    const rick = (await import("./epicCommands/rick")).default;

    rick(msg);
  }
});

for (const event of [
  "SIGINT",
  "uncaughtException",
  "SIGUSR1",
  "SIGUSR2",
] as const) {
  process.on(event, (sig) => {
    client.destroy();
    console.log(
      ` ${sig}\nlogging out of the session. Bye from ${client.user?.tag}`
    );

    process.exit(0);
  });
}

client.login(process.env.BOT_TOKEN);
