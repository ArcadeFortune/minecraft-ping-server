type datatype =
  | { type: "varint"; value: number; }
  | { type: "ushort"; value: number; }
  | { type: "string"; value: string; };

export class DT {
  static string(s: string): datatype {
    return { type: "string", value: s };
  }
  static int(n: number): datatype {
    return { type: "varint", value: n };
  }
  static ushort(u: number): datatype {
    return { type: "ushort", value: u };
  }
  static encode(input: datatype[]) {
    const bytes: number[] = [];
    for (const i of input) {
      switch (i.type) {
        case "string": {
          bytes.push(...this.#encodeString(i.value));
          break;
        }
        case "varint": {
          bytes.push(...this.#encodeVarInt(i.value));
          break;
        }
        case "ushort": {
          bytes.push(...this.#encodeUShort(i.value));
          break;
        }
        default: {
          throw new Error("Unknown datatype of given input.");
        }
      }
    }
    const length = bytes.length;
    return new Uint8Array([length, ...bytes]);
  }

  static #encodeVarInt(n: number) {
    const bytes: number[] = [];
    do {
      let byte = n & 0x7f;
      n >>>= 7;

      if (n !== 0) {
        byte |= 0x80;
      }
      bytes.push(byte);
    } while (n !== 0);
    return bytes;
  }
  static #encodeString(s: string) {
    const text = new TextEncoder().encode(s);
    const length = text.length;
    return [length, ...text];
  }
  static #encodeUShort(n: number): number[] {
    return [(n >> 8) & 0xff, n & 0xff];
  }
}
