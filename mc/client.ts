import { Util } from "./util.ts";
import { DT } from "./datatype.ts";
import { ClientReader } from "./client-reader.ts";
import { debug } from "node:console";
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
    public readonly serverPort: number,
  ) {}

  #ensureConn(): asserts this is this & { conn: Deno.TcpConn } {
    if (!this.conn) {
      throw new Error(
        "No Connection exists. Have you connected with: await client.connect()?",
      );
    }
  }

  async connect(ip: string, port: number = 25565) {
    debug(`Connecting to server ${ip} with port ${port}.`);
    this.conn = await Deno.connect({
      hostname: ip,
      port: port,
    });
  }

  async handshake() {
    this.#ensureConn();
    debug(`Handshaking with version ${this.version}.`);
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
    debug("Asking for server status.");
    await this.conn.write(DT.packet([
      DT.varInt(0),
    ]));

    for await (const packet of this.read()) {
      return packet;
    }
    throw new Error("Connection closed before status was received");
  }

  async *read(timeoutMs = 2000) {
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
      debug("Got new TCP packet.");
      reader.push(buffer.slice(0, bytesRead));
      while (true) {
        const packet = reader.nextPacket();
        if (!packet) break;
        debug("TCP packet finished.");
        const json = reader.parsePacket(packet);
        yield json;
      }
    }
  }
}
