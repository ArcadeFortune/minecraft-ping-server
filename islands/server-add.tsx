interface ServerAddProps {
  onSubmit: (address: string, name: string) => void;
}
export default function ServerAdd({ onSubmit }: ServerAddProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const address = fd.get("address")?.toString();
        const name = fd.get("name")?.toString() || "";
        if (!address) throw new Error("Please provide an address");
        onSubmit(address, name);
      }}
    >
      <label>
        Address
        <input type="text" name="address" required />
      </label>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
}
