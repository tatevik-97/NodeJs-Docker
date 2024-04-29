import { connect, StringCodec, ConnectionOptions } from "nats";

const natsConfig: ConnectionOptions = {
    servers: "nats://localhost:30022",
    timeout: 10000,
    maxReconnectAttempts: 5,
    reconnectTimeWait: 2000,
    name: "NATS Listener",
    // token: process.env.NATS_TOKEN || "GFjhhg35543FGFhggh#$hgffg",
};

async function startListener() {
    let nc;

    try {
        nc = await connect(natsConfig);
        console.log("Listener connected to NATS");

        const sc = StringCodec();

        const sub = nc.subscribe("post:created", {
            queue: "posts-service-queue-group",
            max: 100,
        });

        console.log("Listening for messages on 'post:created'", sub.getSubject());

        for await (const m of sub) {
            try {
                const data = JSON.parse(sc.decode(m.data));

                console.log("Received a message:");
                console.log(data);
            } catch (error) {
                console.error(`Error parsing message: ${error}`);
            } finally {
                m.respond();
            }
        }
    } catch (err) {
        console.log(err);

        console.error(`Error connecting to NATS: ${err}`);
    } finally {
        if (nc) {
            try {
                const done = nc.closed();

                await nc.close();

                const err = await done;
                if (err) {
                    console.error(`Error closing NATS connection: ${err}`);
                }

                console.log("NATS connection closed.");
            } catch (error) {
                console.error(`Error closing NATS connection: ${error}`);
            }
        }
    }
}

startListener();
