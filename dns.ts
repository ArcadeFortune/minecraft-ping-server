export class DNS {
  static async resolve(name: string) {
    const ips = await Deno.resolveDns("_minecraft._tcp." + name, "SRV");
    return { target: ips[0].target, port: ips[0].port };
  }
}
