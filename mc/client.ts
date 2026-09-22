import { Util } from "./util.ts";
import { DT } from "./datatype.ts";
import { ClientReader } from "./client-reader.ts";
import { ServerStatus } from "@/mc/types.ts";

enum CLIENT_STATE {
  Status = 1,
  Login = 2,
}

export class Client {
  conn: Deno.TcpConn | null = null;
  constructor(
    public readonly version: string,
    public readonly serverAddress: string,
    public readonly serverPort: number = Util.DEFAULT_SERVER_PORT,
  ) {}

  #ensureConn(): asserts this is this & { conn: Deno.TcpConn } {
    if (!this.conn) {
      throw new Error(
        "No Connection exists. Have you connected with: await client.connect()?",
      );
    }
  }

  async connect() {
    this.conn = await Deno.connect({
      hostname: this.serverAddress,
      port: this.serverPort,
      autoSelectFamily: false,
      signal: AbortSignal.timeout(Util.DEFAULT_SERVER_TIMEOUT),
    });
    await this.conn.write(DT.packet([
      DT.varInt(0),
      DT.varInt(Util.minecraftVerToProtocolVer(this.version)),
      DT.string(this.serverAddress),
      DT.ushort(this.serverPort),
      DT.varInt(CLIENT_STATE.Status),
    ]));
  }

  async getStatus(): Promise<ServerStatus> {
    this.#ensureConn();
    await this.conn.write(DT.packet([
      DT.varInt(0),
    ]));

    for await (const packet of this.read()) {
      this.conn.close();
      return packet;
    }
    throw new Error("Connection closed before status was received");
  }

  async *read(timeoutMs = Util.DEFAULT_SERVER_TIMEOUT) {
    this.#ensureConn();
    const reader = new ClientReader();
    const buffer = new Uint8Array(4096);
    while (true) {
      let timer: ReturnType<typeof setTimeout>;

      const bytesRead = await Promise.race([
        this.conn.read(buffer),
        new Promise<never>((_, reject) =>
          timer = setTimeout(() => {
            console.warn("Connection timed out.");
            this.conn.close();
            reject(new Error("Read timed out"));
          }, timeoutMs)
        ),
      ])
        .finally(() => timer !== undefined && clearTimeout(timer));

      if (bytesRead === null) return;
      reader.push(buffer.slice(0, bytesRead));
      while (true) {
        const packet = reader.nextPacket();
        if (!packet) break;
        const json = reader.parsePacket(packet);
        yield json;
      }
    }
  }
}
