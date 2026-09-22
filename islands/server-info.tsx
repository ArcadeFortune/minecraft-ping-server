import { ServerItem } from "@/islands/server-list.tsx";
import { useEffect, useState } from "preact/hooks";
import { Util } from "@/mc/util.ts";
import { ServerStatus } from "@/mc/types.ts";

export default function ServerInfo({ server }: { server: ServerItem }) {
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
  return (
    <div>
      <button type="button" onClick={() => setExpanded(!expaned)}>
        <img src={status?.favicon ?? Util.DEFAULT_SERVER_ICON} alt="Server" />
        <div>
          <h2>{server.name || server.address}</h2>
          {!loading &&
            <div>{"server desc" || "Connection refused."}</div>}
        </div>
        <div>
          {status && `${status.players.online} / ${status.players.max}`}
        </div>
      </button>
      {status && status.players.sample &&
        (
          <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${expaned ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              {status.players.sample.map((p, i) => <div key={i}>{p.name}</div>)}
            </div>
          </div>
        )}
    </div>
  );
}
