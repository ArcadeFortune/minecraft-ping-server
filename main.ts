import { Client } from "./client.ts";
import { DNS } from "./dns.ts";

const s = "eu8742734.g-portal.game";
const { target, port } = await DNS.resolve(s);
const client = new Client("26.2", target, port);


await client.connect(target, port);
await client.handshake();
await client.askStatus();
await client.read();
