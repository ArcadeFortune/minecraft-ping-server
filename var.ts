export function encodeInt(n: number) {
  const bytes: number[] = [];
  do {
    let byte = n & 0x7f;
    n >>>= 7;

    if (n !== 0) {
      byte |= 0x80;
    }

    bytes.push(byte);
  } while (n !== 0);

  return new Uint8Array(bytes);
}

export function encodeString(s: string): Uint8Array {
  const text = new TextEncoder().encode(s);
  const length = encodeInt(text.length);
  return prepend(text, length);
}

export function encodeUShort(n: number): Uint8Array {
  return new Uint8Array([
    (n >> 8) & 0xff,
    n & 0xff,
  ]);
}

export function prepend(arr: Uint8Array, prefix: Uint8Array) {
  const out = new Uint8Array(prefix.length + arr.length);
  out.set(prefix, 0);
  out.set(arr, prefix.length);
  return out;
}
