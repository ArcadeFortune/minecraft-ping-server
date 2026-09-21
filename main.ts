import { Client } from "./client.ts";
import { DNS } from "./dns.ts";

import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = {
    message: "Hello from Oak!",
  };
});

router.post("/api/status/", async (ctx) => {
  const body = await ctx.request.body.json();
  try {
    const { address } = body;
    if (!address) throw "No Address defined.";

    const { target, port } = await DNS.resolve(address);
    const client = new Client("26.2", target, port);
    await client.connect(target, port);
    await client.handshake();
    await client.askStatus();
    for await (const packet of client.read()) {
      return ctx.response.body = {
        content: packet,
        error: null,
      };
    }
  } catch (e) {
    ctx.response.status = 400;
    return ctx.response.body = {
      content: "Unable to get status of server.",
      error: e,
    };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });


const s = "eu8742734.g-portal.game";
const { target, port } = await DNS.resolve(s);
const client = new Client("26.2", target, port);
await client.connect(target, port);
await client.handshake();
await client.askStatus();
await client.read(1);
console.log('finished')

