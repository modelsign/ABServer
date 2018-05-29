import {OrderedMap} from 'immutable'
import Monitor from "./Monitor";
import Client from "./Client";

export default class World {
    private monitors: OrderedMap<string, Monitor> = OrderedMap();
    private clients: OrderedMap<string, Client> = OrderedMap();




}
