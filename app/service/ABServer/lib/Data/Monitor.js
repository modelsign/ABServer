"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class Monitor {
    constructor(monitor_mac) {
        this.map_clients = immutable_1.Map();
        this.monitor_mac = monitor_mac;
    }
    add_client(client) {
    }
    get Clients() {
        return this.map_clients;
    }
    update(pkg) {
        return this;
    }
}
exports.default = Monitor;
//# sourceMappingURL=Monitor.js.map