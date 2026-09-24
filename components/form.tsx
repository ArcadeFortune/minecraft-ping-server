import { ComponentChildren, SubmitEventHandler } from "preact";

interface UIFormProps {
  children: ComponentChildren;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}

export default function UIForm(props: UIFormProps) {
  return (
    <form onSubmit={props.onSubmit} class="flex flex-col gap-4">
      {props.children}
    </form>
  );
}
