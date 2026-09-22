import { useEffect, useState } from "preact/hooks";
import { ServerStatus } from "@/mc/types.ts";
import ServerAdd from "@/islands/server-add.tsx";
import ServerInfo from "@/islands/server-info.tsx";

function getServersFromLocalStorage() {
  const servers: ServerItem[] = JSON.parse(localStorage.getItem("servers") ?? "[]");
  console.debug("reading servers", servers);
  return servers;
}

export interface ServerItem {
  address: string;
  name: string;
}

export default function ServerList() {
  const [mode, setMode] = useState<"list" | "add">("list");
  const [servers, setServers] = useState<ServerItem[]>(getServersFromLocalStorage());
  useEffect(() => {
    localStorage.setItem("servers", JSON.stringify(servers));
  }, [servers]);
  return (
    mode === "list"
      ? (
        <>
          {servers.map((s, i) => <ServerInfo key={i} server={s} />)}
          <button type="button" onClick={() => setMode("add")}>add server</button>
        </>
      )
      : (
        <>
          <ServerAdd
            onSubmit={(address, name) => {
              setServers([...servers, { address, name }]);
              setMode("list");
            }}
          />
          <button type="button" onClick={() => setMode("list")}>cancel</button>
        </>
      )
  );
}
