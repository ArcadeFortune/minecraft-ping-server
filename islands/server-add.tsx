import { ServerStatus } from "@/mc/types.ts";

// {
//   description: "Chili SMP",
//   players: { max: 20, online: 0 },
//   version: { name: "Paper 26.2", protocol: 776 },
//   enforcesSecureChat: true
// }

export default function ServerAdd() {
  return (
    <form onSubmit={(e) => e.preventDefault() || console.log("submitted")}>
      <button type="submit">submit</button>
    </form>
  );
}
