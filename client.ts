import { minecraftVerToProtocolVer } from "./util.ts";
import { DT } from "./datatype.ts";
import { ClientReader } from "./client-reader.ts";
import { debug } from "node:console";

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
  ) { }

  #ensureConn(): asserts this is this & { conn: Deno.TcpConn; } {
    if (!this.conn) throw new Error("No Connection exists. Have you connected with: await client.connect()?");
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
      DT.varInt(minecraftVerToProtocolVer(this.version)),
      DT.string(this.serverAddress),
      DT.ushort(this.serverPort),
      DT.varInt(CLIENT_STATE.Status),
    ]));
  }

  async askStatus() {
    this.#ensureConn();
    debug("Asking for server status.");
    await this.conn.write(DT.packet([
      DT.varInt(0)
    ]));
  }

  async *read() {
    this.#ensureConn();
    const reader = new ClientReader();
    const buffer = new Uint8Array(50);
    while (true) {
      const bytesRead = await this.conn.read(buffer);
      if (bytesRead === null) return;
      debug("Got new TCP packet.");
      reader.push(buffer.slice(0, bytesRead));
      while (true) {
        const packet = reader.nextPacket();
        if (!packet) break;
        debug("TCP packet finished.");
        const json = reader.parsePacket(packet);
        debug(json);
        yield json;
      }
    }
  }
}
