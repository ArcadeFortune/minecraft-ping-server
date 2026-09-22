const listener = Deno.listen({
  hostname: "0.0.0.0",
  port: 8080,
  transport: "tcp",
});

console.log("Listening on 0.0.0.0:8080");

for await (const conn of listener) {
  console.log("connection:", conn.remoteAddr);

  handleConnection(conn);
}

async function handleConnection(conn: Deno.Conn) {
  const buffer = new Uint8Array(4096);

  try {
    while (true) {
      const bytesRead = await conn.read(buffer);

      if (bytesRead === null) {
        console.log("connection closed:", conn.remoteAddr);
        break;
      }

      const data = buffer.slice(0, bytesRead);

      console.log(`received ${bytesRead} bytes`);
      console.log(data);

      // If you expect UTF-8 text:
      console.log(new TextDecoder().decode(data));
    }
  } catch (err) {
    console.error("connection error:", err);
  } finally {
    conn.close();
  }
}
