import { ComponentChildren } from "preact";

interface UIH1Props {
  children: ComponentChildren;
}

export default function UIH1(props: UIH1Props) {
  return <h1 class="font-bold text-4xl">{props.children}</h1>;
}
