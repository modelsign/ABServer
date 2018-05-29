"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const Monitor_1 = require("./Data/Monitor");
const Client_1 = require("./Data/Client");
const Datasource_1 = require("./Inst/Datasource");
const Events = require("events");
const Package_1 = require("./Data/Package");
let counter_pkg = 0, map_monitors = immutable_1.Map(), map_clients = immutable_1.Map();
Datasource_1.default.on('update', (data) => {
    let bles = data.bles;
    bles.forEach((data) => {
        console.log(counter_pkg++, JSON.stringify(data));
        let { monitor_id, client_mac, rssi } = data;
        let monitor = map_monitors.get(monitor_id);
        let client = map_clients.get(client_mac);
        if (!monitor) {
            monitor = new Monitor_1.default(monitor_id);
            map_monitors = map_monitors.set(monitor_id, monitor);
        }
        if (!client) {
            client = new Client_1.default(client_mac);
            map_clients = map_clients.set(client_mac, client);
        }
        monitor.update(new Package_1.default(monitor_id, client_mac, rssi));
    });
});
class default_1 extends Events {
    analysis() {
        return __awaiter(this, void 0, void 0, function* () {
            let count_monitors = map_monitors.count(), count_clients = map_clients.count(), area_map = count_clients * count_monitors || 1, count_data = 0;
            map_monitors.forEach((v, k) => {
                let monitor = v, { Clients: clients } = monitor;
                count_data += clients.count();
            });
            return {
                count_monitors,
                count_clients,
                density: count_data / area_map
            };
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=main.js.map