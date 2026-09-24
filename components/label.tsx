import type { ComponentChildren } from "preact";

interface UILabelProps {
  children: ComponentChildren;
}

export default function UILabel(props: UILabelProps) {
  return (
    <label class="flex flex-col items-start">
      {props.children}
    </label>
  );
}
