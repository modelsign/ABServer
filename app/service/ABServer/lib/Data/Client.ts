import {OrderedMap} from 'immutable'
import Monitor from './Monitor'
import Package from "./Package";
import Position from "./Position";

const TIME_TRIM = 1000 * 60,
    COUNT_PKG_DOSAGE = 10,
    COUNT_LOCATION_HISTORY = 20;

export default class Client {

    private mac_client: string;
    private map_monitors: OrderedMap<string, Monitor> = OrderedMap();
    private map_packages: OrderedMap<number, Package> = OrderedMap();
    private threshold_pkg_expired_time: number = TIME_TRIM;
    private rhreshold_pkg_expired_count: number = COUNT_PKG_DOSAGE * COUNT_LOCATION_HISTORY;

    private cal_location(): Position {
        let map_packages = this.map_packages;

        /***************************************************
         *            位置计算算法, 尚未实现
         ***************************************************/
        console.log(map_packages);

        return new Position();
    }

    /**
     * 移除过期数据
     */
    private async remove_old_pkg() {
        let count_all_pkg: number = this.map_packages.count(),
            oldest_pkg: Package = this.map_packages.last(),
            time_current = Date.now();
        if (oldest_pkg.timestamp < time_current - this.threshold_pkg_expired_time) {
            await this.trim()
        }

        return this.map_packages.count();
    }

    constructor(client_mac) {
        this.mac_client = client_mac;
    }

    // 更新数据
    public update(pkg: Package): Client {
        /********************************************************
         *  判断当前实例所记录的位置报告报文数量是否达到清除临界
         *  达到临界值后清除过期数据
         ********************************************************/
        this.remove_old_pkg();


        /********************************************************
         *  解算新数据
         ********************************************************/
        let {
                mac_monintor,
                mac_client,
                timestamp
            } = pkg,
            map_monitors = this.map_monitors,
            map_packages = this.map_packages;

        if (mac_client !== this.mac_client) return null;

        if (!map_monitors.get(mac_monintor)) {
            map_monitors = map_monitors.set(mac_monintor, new Monitor(mac_monintor));
        }
        map_packages = map_packages.set(timestamp, pkg);


        /********************************************************
         *  更新记录
         ********************************************************/
        this.map_monitors = map_monitors;
        this.map_packages = map_packages;
        return this;
    }

    public trim(limit = TIME_TRIM) {
        let map_packages = this.map_packages,
            time_current = Date.now();

        map_packages = map_packages.filter((value, key, iter) => {
            return key > time_current - TIME_TRIM;
        }).toOrderedMap();


        this.map_packages = map_packages;
    }
}
