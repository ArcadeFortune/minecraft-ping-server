export function minecraftVerToProtocolVer(minecraftVer: string) {
  switch (minecraftVer) {
    case "26.2":
      return 776;
    default:
      throw new Error("Unknown minecraft version.");
  }
}

export class Util {
  static DEFAULT_MINECRAFT_PORT = 25565;
  static minecraftVerToProtocolVer(minecraftVer: string) {
    switch (minecraftVer) {
      case "26.2":
        return 776;
      default:
        throw new Error("Unknown minecraft version.");
    }
  }
}
