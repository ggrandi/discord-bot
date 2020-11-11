"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.default = async (msg, args) => {
    const user = msg.mentions.users.first();
    if (!user) {
        msg.reply(`please include a user (ex. !kick @user#0001)`);
        return;
    }
    msg.reply(`kicking user @${user.tag}`);
};
exports.description = "kick a user (ex. !kick @user#0001)";
//# sourceMappingURL=kick.js.map