import type { ComponentChildren } from "preact";

interface UIButtonProps {
  onClick?: () => void;
  children: ComponentChildren;
  disabled?: boolean;
  type?: HTMLButtonElement["type"];
}

export function UIButton(props: UIButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      {...props}
      class="px-2 py-1 border-gray-500 border-2 rounded-none cursor-pointer select-none min-w-28 bg-gray-300 hover:bg-gray-200 hover:shadow-[1px_1px_0_black] focus:shadow-[1px_1px_0_black] focus:outline-0 active:shadow-[-1px_-1px_0_black] pointer-fine:active:bg-gray-300"
    />
  );
}
