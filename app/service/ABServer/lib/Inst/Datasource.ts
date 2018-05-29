const QUEUE_NAME = 'net.msign.lab.ab',
    MQ_CONNECT_STR = 'amqp://mq.tool.budblack.me:9582';

import * as amqplib from 'amqplib';
import * as bsplit from 'buffer-split';
import * as Events from 'events'


class Datasource extends Events {

}

let instDS = new Datasource();

amqplib.connect(MQ_CONNECT_STR)
    .then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
    return ch.assertQueue(QUEUE_NAME).then(function (ok) {
        return ch.consume(QUEUE_NAME, function (msg) {

            let timestamp = Date.now();

            if (msg !== null) {
                let {fields, properties, content} = msg,
                    headLen = content.indexOf('\r\n\r\n'),
                    head = JSON.parse(
                        content.slice(0, headLen).toString()
                    ),
                    blesRaw = content.slice(headLen + 4),
                    bles = bsplit(
                        blesRaw, Buffer.from('\r\n'))
                        .filter((blesRaw) => {
                            return blesRaw.length;
                        })
                        .map((bleRaw) => {
                            if (!bleRaw.length) {
                                return;
                            }
                            let start_of_the_data_frame = bleRaw[0],
                                data_of_the_length = bleRaw[1],
                                advertising_type = bleRaw[2],
                                mac_address_for_ble_device = bleRaw.slice(3, 9)
                                    .toString('hex'),
                                rssi = bleRaw[9] - 256;
                            return {
                                client_mac: mac_address_for_ble_device,
                                monitor_id: head.id,
                                rssi
                            };
                        }).sort((a, b) => {
                            return b.rssi - a.rssi;
                        });

                instDS.emit(
                    'update',
                    {
                        timestamp: Date.now(),
                        bles
                    }
                );

                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);

export default instDS;
