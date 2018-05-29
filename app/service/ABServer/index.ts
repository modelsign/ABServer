import * as Events from 'events'
import Main from './lib/main'

enum ABServerEventEnum {
    start = 'start',
    restart = 'restart',
    updating = 'updating'
}


class ABServer extends Main {
    private onStart() {
        console.log('ABServer 启动')
    }

    constructor() {
        super();

        this.once(ABServerEventEnum.start, this.onStart);
        this.emit(ABServerEventEnum.start)
    }

    public update() {
        this.emit(ABServerEventEnum.updating)

    }
}


export default new ABServer();
