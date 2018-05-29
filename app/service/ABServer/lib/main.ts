import {Map} from 'immutable'
import Monitor from "./Data/Monitor";
import Client from "./Data/Client";
import InstDs from './Inst/Datasource'
import * as Events from 'events'
import Package from "./Data/Package";

let
    map_monitors: Map<string, Monitor>
        = Map<string, Monitor>(),
    map_clients: Map<string, Client>
        = Map<string, Client>();

InstDs.on('update', (data) => {
    let bles: Array<any> = data.bles;

    bles.forEach((data) => {
        console.log(JSON.stringify(data));
        let {monitor_id, client_mac, rssi} = data;
        let monitor = map_monitors.get(monitor_id);
        let client = map_clients.get(client_mac);

        if (!monitor) {
            monitor = new Monitor(monitor_id);
            map_monitors = map_monitors.set(monitor_id, monitor);
        }

        if (!client) {
            client = new Client(client_mac);
            map_clients = map_clients.set(client_mac, client);
        }

        monitor.update(new Package(monitor_id, client_mac, rssi));
    });
});

export default class extends Events {

    async analysis() {

        let count_monitors = map_monitors.count(),
            count_clients = map_clients.count(),
            area_map = count_clients * count_monitors || 1,
            count_data = 0;

        map_monitors.forEach((v, k) => {
            let monitor: Monitor = v,
                {Clients: clients} = monitor;

            count_data += clients.count();
        });

        return {
            count_monitors,
            count_clients,
            density: count_data / area_map
        }
    }
}
