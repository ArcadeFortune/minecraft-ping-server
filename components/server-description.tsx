import { ServerStatus } from "@/mc/types.ts";
import { ComponentChild } from "preact";

function FormatText(text: string) {
  const result: ComponentChild[] = [];
  let style: Record<string, unknown> = {};
  let buffer = "";
  function flush() {
    result.push(RecurseText({ text: { text: buffer, ...style } }));
    buffer = "";
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "\n") {
      flush();
      result.push(<br />);
      continue;
    }
    if (text[i] !== "§" || i + 1 >= text.length) {
      buffer += text[i];
      continue;
    }
    flush();
    const code = text[++i].toLowerCase();
    switch (code) {
      case "0":
        style.color = "black";
        break;
      case "1":
        style.color = "text-blue-900";
        break;
      case "2":
        style.color = "dark_blue";
        break;
      case "3":
        style.color = "dark_aqua";
        break;
      case "4":
        style.color = "dark_red";
        break;
      case "5":
        style.color = "dark_purple";
        break;
      case "6":
        style.color = "gold";
        break;
      case "7":
        style.color = "gray";
        break;
      case "8":
        style.color = "dark_gray";
        break;
      case "9":
        style.color = "blue";
        break;
      case "a":
        style.color = "green";
        break;
      case "b":
        style.color = "aqau";
        break;
      case "c":
        style.color = "red";
        break;
      case "d":
        style.color = "purple";
        break;
      case "e":
        style.color = "yellow";
        break;
      case "f":
        style.color = "white";
        break;
      case "l":
        style.bold = true;
        break;
      case "o":
        style.italic = true;
        break;
      case "n":
        style.underline = true;
        break;
      case "m":
        style.strikethrough = true;
        break;
      case "r":
        style = {};
        break;
    }
  }
  flush();
  return result;
}



interface UIServerDescriptionProps {
  text: ServerStatus["description"];
}

function RecurseText({ text }: { text: UIServerDescriptionProps["text"] }) {
  if (typeof text === "string") return FormatText(text);
  return (
    <span
      class={`
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
      {text.text}
      {text.extra?.map((t, i) => <RecurseText key={i} text={t} />)}
    </span>
  );
}

export default function UIServerDescription({ text }: UIServerDescriptionProps) {
  return <RecurseText text={text} />;
}
