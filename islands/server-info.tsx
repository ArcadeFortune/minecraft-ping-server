import { ServerItem } from "@/islands/server-list.tsx";
import { useEffect } from "preact/hooks";

export default function ServerInfo({ server }: { server: ServerItem }) {
  useEffect(() => {
    const params = new URLSearchParams({ address: server.address });
    fetch("/api/status?" + params.toString());
  }, []);
  return (
    <div>
      <h1>Server Info Island</h1>
      {server.address} | {server.name}
    </div>
  );
}
