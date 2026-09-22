export function minecraftVerToProtocolVer(minecraftVer: string) {
  switch (minecraftVer) {
    case "26.2":
      return 776;
    default:
      throw new Error("Unknown minecraft version.");
  }
}

export class Util {
  static DEFAULT_SERVER_PORT = 25565;
  static DEFAULT_SERVER_TIMEOUT = 1000;
  static DEFAULT_SERVER_ICON = "default-server.png";
  static minecraftVerToProtocolVer(minecraftVer: string) {
    switch (minecraftVer) {
      case "26.2":
        return 776;
      default:
        throw new Error("Unknown minecraft version.");
    }
  }
}
