interface BaseProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  title?: string;
}

interface TextInput {
  type: "text";
  value?: string;
  placeholder?: string;
  autocomplete?: HTMLInputElement["autocomplete"];
}

type UIInputProps = BaseProps & (TextInput);

export function UIInput(props: UIInputProps) {
  switch (props.type) {
    case "text":
      return (
        <input
          class="ring-2 px-2 py-1 bg-black text-gray-100 border-gray-300 border-2 focus:outline-2"
          type="text"
          name={props.name}
          value={props.value}
          autocomplete={props.autocomplete || "on"}
          required={props.required}
          placeholder={props.placeholder}
          title={props.title}
        />
      );
    default:
      throw new Error(`Unknown input type: ${props.type}`);
  }
}
