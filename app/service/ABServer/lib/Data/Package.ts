export default class Package {
    mac_monintor: string;
    mac_client: string;
    rssi: number;
    timestamp: number;

    constructor(mac_monintor, mac_client, rssi, timestamp=Date.now()) {

    }
}
