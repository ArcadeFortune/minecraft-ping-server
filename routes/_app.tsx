import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Minecraft Server Status</title>
        <meta
          name="description"
          content="Ping Minecraft servers and see online players without opening Minecraft."
        />
      </head>
      <body class="font-display">
        <Component />
      </body>
    </html>
  );
});
