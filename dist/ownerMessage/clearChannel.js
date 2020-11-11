"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const discord_js_1 = require("discord.js");
const sendDm_1 = require("../utils/sendDm");
const confirmationMap = new Map();
exports.default = async (msg, args) => {
    if (msg.channel instanceof discord_js_1.TextChannel) {
        const channelId = msg.channel.id;
        const confirmation = confirmationMap.get(channelId);
        if (confirmation && msg.author.id === confirmation.userId) {
            if (args[0] === "confirm") {
                while (msg.channel.lastMessage) {
                    await msg.channel.bulkDelete(100);
                }
                confirmationMap.delete(channelId);
                const channelName = msg.guild?.channels.cache.get(msg.channel.id)?.name;
                sendDm_1.sendDm(msg.author, `cleared all messages in ${channelName || "the channel"}`);
            }
            else {
                msg.reply("please confirm the deletion with `!clearChannel confirm`");
            }
        }
        else {
            confirmationMap.set(channelId, {
                time: Date.now(),
                userId: msg.author.id,
            });
            msg.reply(`confirm the clearing of this channel with \`!clearChannel confirm\``);
        }
        for (const [key, { time }] of confirmationMap.entries()) {
            if (Date.now() - time > 1000 * 60 * 10) {
                confirmationMap.delete(key);
            }
        }
    }
};
exports.description = "clears all the messages from the current channel";
//# sourceMappingURL=clearChannel.js.map