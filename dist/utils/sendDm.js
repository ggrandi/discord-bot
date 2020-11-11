"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDm = void 0;
exports.sendDm = async (user, dm) => {
    try {
        const dmChannel = await user.createDM();
        dmChannel.send(dm);
    }
    catch (e) {
        console.error(e);
    }
};
//# sourceMappingURL=sendDm.js.map