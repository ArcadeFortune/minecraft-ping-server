import { DT } from "./datatype.ts";

export class ClientReader {
  #buffer = new Uint8Array();

  /**
   * Push tcp chunks
   */
  push(chunk: Uint8Array) {
    this.#buffer = DT.concatRaw(this.#buffer, chunk);
  }
  /**
   * Checks if tcp chunks pushed so far build one full packet.
   */
  nextPacket(): Uint8Array | null {
    //check advertised length of current packet
    const advertisedLength = DT.decodeVarInt(this.#buffer);
    if (!advertisedLength) return null;
    const packetStart = advertisedLength.raw.length;
    const packetEnd = packetStart + advertisedLength.js;

    //is part of packet still missing?
    if (this.#buffer.length < packetEnd) {
      return null;
    } else {
      //pop packet from #buffer and return it
      const packet = this.#buffer.slice(packetStart, packetEnd);
      this.#buffer = this.#buffer.slice(packetEnd);
      return packet;
    }
  }
  parsePacket(packet: Uint8Array) {
    let offset = 0;

    const packetId = DT.decodeVarInt(packet, offset);
    if (!packetId) throw new Error("Packet ID is invalid.");
    offset += packetId?.raw.length;

    const jsonLength = DT.decodeVarInt(packet, offset);
    if (!jsonLength) throw new Error("JSON length is invalid.");
    offset += jsonLength.raw.length;

    const payload = packet.slice(offset);
    const text = new TextDecoder().decode(payload);
    return JSON.parse(text);
  }
}
