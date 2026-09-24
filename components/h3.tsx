import { ComponentChildren } from "preact";

interface UIH3Props {
  children: ComponentChildren;
}

export default function UIH3(props: UIH3Props) {
  return <h3 class="font-bold text-2xl leading-none">{props.children}</h3>;
}
