import ServerList from "@/islands/server-list.tsx";
import { define } from "../utils.ts";
export default define.page(function Home() {
  return (
    <>
      <h1>Servers</h1>
      <ServerList />
    </>
  );
});
