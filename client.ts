import { minecraftVerToProtocolVer } from "./util.ts";
import { DT } from "./datatype.ts";

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
    this.conn = await Deno.connect({
      hostname: ip,
      port: port,
    });
  }

  async handshake() {
    this.#ensureConn();
    await this.conn.write(DT.encode([
      DT.int(0),
      DT.int(minecraftVerToProtocolVer(this.version)),
      DT.string(this.serverAddress),
      DT.ushort(this.serverPort),
      DT.int(CLIENT_STATE.Status),
    ]));
  }

  async serverStatus() {
    this.#ensureConn();
    await this.conn.write(DT.encode([
      DT.int(0)
    ]));
  }

  async read() {
    this.#ensureConn();
    const buffer = new Uint8Array(4096);
    while (true) {
      const n = await this.conn.read(buffer);

      if (n === null) {
        console.log("Server closed connection");
        break;
      }
      const data = buffer.slice(0, n);
      console.log("server:", data);
    }
  }
}
