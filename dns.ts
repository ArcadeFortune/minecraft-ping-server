export async function resolve(name: string) {
  const ips = await Deno.resolveDns(name, "A");
  return ips[0];
}
export async function resolveSrv(name: string) {
  const ips = await Deno.resolveDns("_minecraft._tcp." + name, "SRV");
  return { target: ips[0].target, port: ips[0].port };
}
