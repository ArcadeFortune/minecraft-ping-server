import ServerInfo from "@/islands/server-info.tsx";
import { define } from "../utils.ts";
import ServerAdd from "@/islands/server-add.tsx";

export default define.page(function Home() {
  return (
    <>
      <h1>Servers</h1>
      <ServerInfo />
      <ServerAdd />
    </>
  );
});
