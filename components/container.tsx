import type { ComponentChildren } from "preact";

interface UIContainerProps {
  children: ComponentChildren;
}

export default function UIContainer(props: UIContainerProps) {
  return (
    <div class="max-w-5xl mx-auto p-4 flex flex-col items-start gap-4">
      {props.children}
    </div>
  );
}
