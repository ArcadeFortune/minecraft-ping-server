import { DNS } from "@/mc/dns.ts";
import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const address = ctx.url.searchParams.get("address");
    if (!address) throw new Error("No address defined.");
    const { target, port } = await DNS.resolve(address);
    return new Response("test", {
      headers: {
        "Cache-Control": "public, max-age=1",
      },
    });
  },
});
