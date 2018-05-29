"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class World {
    constructor() {
        this.monitors = immutable_1.OrderedMap();
        this.clients = immutable_1.OrderedMap();
    }
}
exports.default = World;
//# sourceMappingURL=World.js.map