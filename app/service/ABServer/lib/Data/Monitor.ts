import {Map} from 'immutable'
import Client from './Client'
import Position from "./Position";
import Package from "./Package";


export default class Monitor {

    private time_start;
    private time_update;
    private monitor_mac;
    private map_clients: Map<string, Client> = Map();

    public location: Position;

    private add_client(client: Client) {

    }

    constructor(monitor_mac) {
        this.monitor_mac = monitor_mac;
    }

    public get Clients() {
        return this.map_clients;
    }

    public update(pkg: Package): Monitor {



        return this;
    }
}
