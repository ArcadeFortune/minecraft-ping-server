export function minecraftVerToProtocolVer(minecraftVer: string) {
  switch (minecraftVer) {
    case "26.2":
      return 776;
    default:
      throw new Error("Unknown minecraft version.");
  }
}
