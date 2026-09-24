import { useEffect, useState } from "preact/hooks";
import ServerAdd from "@/islands/server-add.tsx";
import ServerItem from "@/islands/server-item.tsx";
import { UIButton } from "@/components/button.tsx";
import UIServerList from "@/components/server-list.tsx";

function getServersFromLocalStorage() {
  const servers: ServerInfo[] = JSON.parse(localStorage.getItem("servers") || "[]");
  return servers;
}

export interface ServerInfo {
  address: string;
  name: string;
}

export default function ServerList() {
  const [mode, setMode] = useState<"list" | "add">("list");
  const [servers, setServers] = useState<ServerInfo[]>(getServersFromLocalStorage());
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("servers", JSON.stringify(servers));
  }, [servers]);

  return (
    mode === "list"
      ? (
        <>
          <UIServerList>
            {servers.map((s, i) => <ServerItem key={i} idx={i} server={s} selected={selected} setSelected={setSelected} />)}
          </UIServerList>
          <UIButton onClick={() => setMode("add")}>Add server</UIButton>
        </>
      )
      : (
        <ServerAdd
          onSubmit={(address, name) => {
            setServers([...servers, { address, name }]);
            setMode("list");
          }}
          onCancel={() => setMode("list")}
        />
      )
  );
}
