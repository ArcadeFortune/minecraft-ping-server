import { ServerStatus } from "@/mc/types.ts";

interface UIServerDescriptionProps {
  text: ServerStatus["description"];
}

function RecurseText({ text }: { text: UIServerDescriptionProps["text"] }) {
  if (typeof text === "string") return text;
  return (
    <span
      class={`
        whitespace-pre-wrap
        ${text.bold ? "font-bold" : ""}
        ${text.italic ? "font-italic" : ""}
        ${text.underlined ? "underline" : ""}
        ${text.strikethrough ? "line-through" : ""}
        ${text.color === "black" ? "text-black" : ""}
        ${text.color === "dark_blue" ? "text-blue-900" : ""}
        ${text.color === "dark_green" ? "text-green-800" : ""}
        ${text.color === "dark_aqua" ? "text-cyan-800" : ""}
        ${text.color === "dark_red" ? "text-red-800" : ""}
        ${text.color === "dark_purple" ? "text-purple-800" : ""}
        ${text.color === "gold" ? "text-yellow-500" : ""}
        ${text.color === "gray" ? "text-gray-500" : ""}
        ${text.color === "dark_gray" ? "text-gray-700" : ""}
        ${text.color === "blue" ? "text-blue-500" : ""}
        ${text.color === "green" ? "text-green-500" : ""}
        ${text.color === "aqua" ? "text-cyan-400" : ""}
        ${text.color === "red" ? "text-red-500" : ""}
        ${text.color === "light_purple" ? "text-purple-400" : ""}
        ${text.color === "yellow" ? "text-yellow-400" : ""}
        ${text.color === "white" ? "text-white" : ""}
      `}
    >
      {text.extra?.map((t, i) => <RecurseText key={i} text={t} />)}
    </span>
  );
}

export default function UIServerDescription({ text }: UIServerDescriptionProps) {
  return "rendering server desc WIP";
  <RecurseText text={text} />;
  }
