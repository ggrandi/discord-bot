"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const epicCommands_1 = require("./epicCommands");
const ownerMessage_1 = require("./ownerMessage");
dotenv_safe_1.default.config();
exports.client = new discord_js_1.Client();
exports.client.on("ready", () => {
    if (exports.client.user) {
        console.log(`logged in as ${exports.client.user.tag}`);
    }
    else {
        throw new Error("Not Logged in!");
    }
});
exports.client.on("message", async (msg) => {
    if (msg.content.startsWith("!")) {
        const checkMsgFunctions = [ownerMessage_1.ownerMessage, epicCommands_1.epicCommands];
        let l = 4;
        const list = [
            [(m) => `\`!${"help".padEnd(m)} - sends you this menu\``],
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
        const reply = [];
        if (msg.content !== "!help") {
            reply.push(`\`${msg.content}\` is not a valid command`);
        }
        reply.push("Here is a list of all valid commands you can use: ");
        reply.push(">>> " +
            list
                .flat()
                .map((v) => v(l))
                .join("\n"));
        msg.reply(reply.join("\n"));
    }
    if (Math.random() < 0.02) {
        const rick = (await Promise.resolve().then(() => __importStar(require("./epicCommands/rick")))).default;
        rick(msg);
    }
});
for (const event of [
    "SIGINT",
    "uncaughtException",
    "SIGUSR1",
    "SIGUSR2",
]) {
    process.on(event, (sig) => {
        exports.client.destroy();
        console.log(` ${sig}\nlogging out of the session. Bye from ${exports.client.user?.tag}`);
        process.exit(0);
    });
}
exports.client.login(process.env.BOT_TOKEN);
//# sourceMappingURL=index.js.map