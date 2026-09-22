import { DNS } from "@/mc/dns.ts";
import { Client } from "@/mc/client.ts";
import { define, respond } from "../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const address = ctx.url.searchParams.get("address");
    if (!address) throw new Error("No address defined.");
    try {
      const { target, port } = await DNS.resolve(address);
      const client = new Client("26.2", target, port);
      await client.connect();
      const res = await client.getStatus();
      return respond(res, 200, null);
    } catch (e) {
      return respond("Server is Unavailable", 503, `${e}`);
    }
  },
});
