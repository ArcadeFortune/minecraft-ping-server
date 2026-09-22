import { Client } from "./client.ts";
import { DNS } from "./dns.ts";

// const s = "2b2t.org";
// const s = "example.com";
const s = "localhost:8081";
// const s = "eu8742734.g-portal.game";
const { target, port } = await DNS.resolve(s);
const client = new Client("26.2", target, port);
await client.connect(target, port);
await client.handshake();
console.log(JSON.stringify(await client.getStatus()));
