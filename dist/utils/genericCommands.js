"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericCommands = void 0;
exports.genericCommands = (commandArr, name, condition = true) => async (msg) => {
    const commandMap = new Map(commandArr);
    if (condition === true || condition(msg)) {
        const command = msg.content.slice(1).split(" ")[0];
        const action = commandMap.get(command);
        if (action) {
            await Promise.resolve((await action).default(msg, msg.content.split(" ").slice(1)));
        }
        else {
            const commands = [() => name];
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
    }
    else {
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
//# sourceMappingURL=genericCommands.js.map