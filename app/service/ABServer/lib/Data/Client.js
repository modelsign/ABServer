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
const Monitor_1 = require("./Monitor");
const Position_1 = require("./Position");
const TIME_TRIM = 1000 * 60, COUNT_PKG_DOSAGE = 10, COUNT_LOCATION_HISTORY = 20;
class Client {
    constructor(client_mac) {
        this.map_monitors = immutable_1.OrderedMap();
        this.map_packages = immutable_1.OrderedMap();
        this.threshold_pkg_expired_time = TIME_TRIM;
        this.rhreshold_pkg_expired_count = COUNT_PKG_DOSAGE * COUNT_LOCATION_HISTORY;
        this.mac_client = client_mac;
    }
    cal_location() {
        let map_packages = this.map_packages;
        /***************************************************
         *            位置计算算法, 尚未实现
         ***************************************************/
        console.log(map_packages);
        return new Position_1.default();
    }
    /**
     * 移除过期数据
     */
    remove_old_pkg() {
        return __awaiter(this, void 0, void 0, function* () {
            let count_all_pkg = this.map_packages.count(), oldest_pkg = this.map_packages.last(), time_current = Date.now();
            if (oldest_pkg.timestamp < time_current - this.threshold_pkg_expired_time) {
                yield this.trim();
            }
            return this.map_packages.count();
        });
    }
    // 更新数据
    update(pkg) {
        /********************************************************
         *  判断当前实例所记录的位置报告报文数量是否达到清除临界
         *  达到临界值后清除过期数据
         ********************************************************/
        this.remove_old_pkg();
        /********************************************************
         *  解算新数据
         ********************************************************/
        let { mac_monintor, mac_client, timestamp } = pkg, map_monitors = this.map_monitors, map_packages = this.map_packages;
        if (mac_client !== this.mac_client)
            return null;
        if (!map_monitors.get(mac_monintor)) {
            map_monitors = map_monitors.set(mac_monintor, new Monitor_1.default(mac_monintor));
        }
        map_packages = map_packages.set(timestamp, pkg);
        /********************************************************
         *  更新记录
         ********************************************************/
        this.map_monitors = map_monitors;
        this.map_packages = map_packages;
        return this;
    }
    trim(limit = TIME_TRIM) {
        let map_packages = this.map_packages, time_current = Date.now();
        map_packages = map_packages.filter((value, key, iter) => {
            return key > time_current - TIME_TRIM;
        }).toOrderedMap();
        this.map_packages = map_packages;
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map