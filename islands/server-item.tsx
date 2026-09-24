import { ServerInfo } from "@/islands/server-overview.tsx";
import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import { Util } from "@/mc/util.ts";
import { ServerStatus } from "@/mc/types.ts";
import UIH3 from "@/components/h3.tsx";
import UIServerDescription from "@/components/server-description.tsx";

interface ServerItemProps {
  idx: number;
  server: ServerInfo;
  selected: number | null;
  setSelected: Dispatch<StateUpdater<number | null>>;
}

export default function ServerItem({ idx, server, selected, setSelected }: ServerItemProps) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [expaned, setExpanded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ address: server.address });
    fetch("/api/status?" + params.toString(), { cache: "no-store" })
      .then(async (res) => res.ok ? await res.json() : Promise.reject(await res.json()))
      .then((data) => setStatus(data.message))
      .catch((e) => console.error(e.error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setExpanded(idx === selected);
  }, [selected]);
  return (
    <li class={`not-last:mb-2 ${idx === selected ? "ring-2" : ""}`}>
      <button
        class="w-full flex items-center gap-4 cursor-pointer select-none"
        type="button"
        onClick={() => {
          setSelected(idx === selected ? null : idx);
        }}
      >
        <img
          class="size-16"
          src={status?.favicon ?? Util.DEFAULT_SERVER_ICON}
          alt="Server"
        />
        <div class="self-stretch text-start">
          <UIH3>{server.name || server.address}</UIH3>
          {!loading &&
            <UIServerDescription text={status?.description ?? "No description."} />}
        </div>
        <div class="ms-auto">
          {status ? `${status.players.online} / ${status.players.max}` : "?"}
        </div>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${expaned ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          {status?.players?.sample?.map((p, i) => <div key={i}>{p.name}</div>) ??
            "No player Information available."}
        </div>
      </div>
    </li>
  );
}
