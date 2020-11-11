import { Message } from "discord.js";

export interface ImportCommand {
  default: (msg: Message, args: string[]) => void | Promise<void>;
  description: string;
}

type CommandReturn =
  | {
      success: true;
    }
  | {
      success: false;
      /** When it fails, it only sends one dm to the user */
      commands: ((length: number) => string)[];
      /** The longest commans */
      maxLength: number;
    };

/**
 *
 * @param commandMap a map of all the commands with their actions and descriptions
 * @param condition a function to check whether these commands can be run (ex. check if the user has the privilege)
 * @param escape the character to signal to search for commands (default: "!")
 */
export const genericCommands = (
  commandArr: [string, Promise<ImportCommand>][],
  name: string,
  condition: ((msg: Message) => boolean) | true = true
) => async (msg: Message): Promise<CommandReturn> => {
  const commandMap = new Map(commandArr);

  if (condition === true || condition(msg)) {
    const command = msg.content.slice(1).split(" ")[0];

    const action = commandMap.get(command);

    if (action) {
      await Promise.resolve(
        (await action).default(msg, msg.content.split(" ").slice(1))
      );
    } else {
      const commands: ((l: number) => string)[] = [() => name];
      let maxLength = 0;

      for (const [cmd, imp] of commandMap.entries()) {
        const { description } = await imp;
        if (cmd.length > maxLength) {
          maxLength = cmd.length;
        }

        commands.push((l) => `\`!${cmd.padEnd(l)} - ${description}\``);
      }

      return {
        success: false,
        commands,
        maxLength,
      };
    }
  } else {
    return {
      success: false,
      commands: [],
      maxLength: 0,
    };
  }

  return {
    success: true,
  };
};
