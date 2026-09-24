import { ComponentChildren } from "preact";

interface UIServerListProps {
  children: ComponentChildren;
}

export default function UIServerList(props: UIServerListProps) {
  return (
    <ul class="shadow-[-1px_-1px_0_gray] w-full bg-black text-gray-100 p-4 max-h-[80svh] overflow-y-scroll scrollbar-track-black scrollbar-thumb-gray-300">
      {props.children}
    </ul>
  );
}
