import { Util } from "@/mc/util.ts";

export class DNS {
  static async resolve(name: string) {
    const match = name.match(/^(?<hostname>[^:]+)(?::(?<port>\d+))?$/);
    if (match?.groups?.port) {
      return { target: match.groups.hostname, port: Number(match.groups.port) };
    }
    console.debug("resolving DNS for: " + name);
    try {
      const ips = await Deno.resolveDns("_minecraft._tcp." + name, "SRV");
      return { target: ips[0].target, port: ips[0].port };
    } catch (_) {
      return { target: name, port: Util.DEFAULT_MINECRAFT_PORT };
    }
  }
}
