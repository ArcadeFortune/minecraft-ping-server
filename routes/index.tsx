import ServerList from "@/islands/server-overview.tsx";
import { define } from "../utils.ts";
import UIH1 from "@/components/h1.tsx";
import UIContainer from "@/components/container.tsx";
export default define.page(function Home() {
  return (
    <UIContainer>
      <UIH1>Server List</UIH1>
      <ServerList />
    </UIContainer>
  );
});
