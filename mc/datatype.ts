type Datatype =
  | { type: "varint"; js: number, raw: Uint8Array<ArrayBuffer>; }
  | { type: "ushort"; js: number, raw: Uint8Array<ArrayBuffer>; }
  | { type: "string"; js: string, raw: Uint8Array<ArrayBuffer>; };
export class DT {
  static varInt(n: number): Datatype {
    if (!Number.isInteger(n) || n < -2147483648 || n > 2147483647) {
      throw new RangeError("VarInt must be a signed 32-bit integer");
    }
    const bytes: number[] = [];
    const original = n;
    do {
      let byte = n & 0x7f;
      n >>>= 7;

      if (n !== 0) {
        byte |= 0x80;
      }
      bytes.push(byte);
    } while (n !== 0);
    return { type: "varint", js: original, raw: new Uint8Array(bytes) };
  }
  static ushort(u: number): Datatype {
    if (!Number.isInteger(u) || u < 0 || u > 0xffff) {
      throw new RangeError("ushort must be an integer from 0 to 65535");
    }
    return { type: "ushort", js: u, raw: new Uint8Array([(u >> 8) & 0xff, u & 0xff]) };
  }
  static string(s: string): Datatype {
    const text = new TextEncoder().encode(s);
    const length = this.varInt(text.length).raw;
    return { type: "string", js: s, raw: this.concatRaw(length, text) };
  }
  static concat(input: Datatype[]): Uint8Array {
    const totalLength = input.reduce((sum, item) => sum + item.raw.length, 0);
    const out = new Uint8Array(totalLength);

    let offset = 0;
    for (const item of input) {
      out.set(item.raw, offset);
      offset += item.raw.length;
    }
    return out;
  }
  /**
   * creates a new Uint8Array from the two inputs
   */
  static concatRaw(a: Uint8Array, b: Uint8Array) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a);
    out.set(b, a.length);
    return out;
  }
  static packet(input: Datatype[]) {
    const body = this.concat(input);
    const length = this.varInt(body.length).raw;

    const out = new Uint8Array(length.length + body.length);
    out.set(length);
    out.set(body, length.length);
    return out;
  }

  static decodeVarInt(data: Uint8Array, offset: number = 0): Extract<Datatype, { type: "varint"; }> | null {
    let value = 0;
    let shift = 0;

    for (let i = offset; i < data.length; i++) {
      const byte = data[i];

      value |= (byte & 0x7f) << shift;

      if ((byte & 0x80) === 0) {
        return {
          type: "varint",
          js: value,
          raw: data.slice(offset, i + 1)
        };
      }
      shift += 7;
      if (shift >= 35) {
        throw new Error("VarInt too large");
      }
    }
    return null;
  }
}
