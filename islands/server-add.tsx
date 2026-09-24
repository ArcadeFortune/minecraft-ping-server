import UIH2 from "@/components/h2.tsx";
import { UIButton } from "@/components/button.tsx";
import UIForm from "@/components/form.tsx";
import UILabel from "@/components/label.tsx";
import { UIInput } from "@/components/input.tsx";

interface ServerAddProps {
  onSubmit: (address: string, name: string) => void;
  onCancel?: () => void;
}

export default function ServerAdd({ onSubmit, onCancel }: ServerAddProps) {
  return (
    <UIForm
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const address = fd.get("address")?.toString();
        if (!address) throw new Error("Please provide an address");
        const name = fd.get("name")?.toString() || address;
        onSubmit(address, name);
      }}
    >
      <UIH2>Add Server</UIH2>
      <UILabel>
        Name
        <UIInput type="text" name="name" placeholder="Minecraft Server" />
      </UILabel>
      <UILabel>
        Address
        <UIInput type="text" name="address" required title="Enter IP address of the server" />
      </UILabel>
      <div class="flex gap-4">
        <UIButton type="submit">Add Server</UIButton>
        {onCancel && <UIButton onClick={onCancel}>Cancel</UIButton>}
      </div>
    </UIForm>
  );
}
