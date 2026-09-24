import { ComponentChildren } from "preact";

interface UIH2Props {
  children: ComponentChildren;
}

export default function UIH2(props: UIH2Props) {
  return <h2 class="font-bold text-3xl">{props.children}</h2>;
}
