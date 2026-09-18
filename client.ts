import { minecraftVerToProtocolVer } from "./util.ts";
import * as v from "./var.ts";

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

  #ensureConn() {
    if (!this.conn) throw new Error("No Connection exists. Have you connected with: await client.connect()?");
  }

  #createPacket(packetId: number, state: CLIENT_STATE) {
    //     VarInt packet_length
    // VarInt packet_id          // 0
    // VarInt protocol_version
    // String server_address
    // Unsigned Short server_port
    // VarInt next_state
    const packet = new Uint8Array([
      // 1. length (added later)
      // 2. packet id
      ...v.encodeInt(packetId),
      // 3. protocol version
      ...v.encodeInt(minecraftVerToProtocolVer(this.version)),
      // 4. Server Address
      ...v.encodeString(this.serverAddress),
      // 5. server port
      ...v.encodeUShort(this.serverPort),
      // 6. next state
      ...v.encodeInt(state),
    ]);
    const length = v.encodeInt(packet.length);

    return v.prepend(packet, length);
  }



  async connect(ip: string, port: number = 25565) {
    this.conn = await Deno.connect({
      hostname: ip,
      port: port,
    });
  }

  async handshake() {
    this.#ensureConn();
    const packet = this.#createPacket(0, CLIENT_STATE.Status);
    console.log(packet);
  }
}

// function writeVarInt(value: number): number[] {
//   const out: number[] = [];

//   do {
//     let temp = value & 0x7f;
//     value >>>= 7;

//     if (value !== 0) {
//       temp |= 0x80;
//     }

//     out.push(temp);
//   } while (value !== 0);

//   return out;
// }

// function writeString(value: string): number[] {
//   const bytes = new TextEncoder().encode(value);

//   return [
//     ...writeVarInt(bytes.length),
//     ...bytes,
//   ];
// }

// function makeHandshake(
//   protocolVersion: number,
//   hostname: string,
//   port: number,
// ): Uint8Array {
//   const payload: number[] = [
//     ...writeVarInt(0x00), // packet ID
//     ...writeVarInt(protocolVersion),
//     ...writeString(hostname),

//     // unsigned short, big endian
//     (port >> 8) & 0xff,
//     port & 0xff,

//     ...writeVarInt(1), // next state = Status
//   ];

//   return new Uint8Array([
//     ...writeVarInt(payload.length),
//     ...payload,
//   ]);
// }

// const hostname = "example.com";
// const port = 25565;

// const conn = await Deno.connect({
//   hostname,
//   port,
// });

// const handshake = makeHandshake(
//   767, // example protocol version
//   hostname,
//   port,
// );

// await conn.write(handshake);

// console.log("handshake sent");
