"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./lib/main");
var ABServerEventEnum;
(function (ABServerEventEnum) {
    ABServerEventEnum["start"] = "start";
    ABServerEventEnum["restart"] = "restart";
    ABServerEventEnum["updating"] = "updating";
})(ABServerEventEnum || (ABServerEventEnum = {}));
class ABServer extends main_1.default {
    onStart() {
        console.log('ABServer 启动');
    }
    constructor() {
        super();
        this.once(ABServerEventEnum.start, this.onStart);
        this.emit(ABServerEventEnum.start);
    }
    update() {
        this.emit(ABServerEventEnum.updating);
    }
}
exports.default = new ABServer();
//# sourceMappingURL=index.js.map