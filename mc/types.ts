type ServerStatusDescription = string | {
  text: string;
  extra?: ServerStatusDescription[];
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  obfuscated?: boolean;
  strikethrough?: boolean;
};
type ServerStatusPlayers = {
  max: number;
  online: number;
  sample?: { id: string; name: string }[];
};
type ServerStatusVersion = { name: string; protocol: number };
type ServerStatusModinfo = {
  "type": "FML";
  "modList": unknown[];
};
export type ServerStatus = {
  description: ServerStatusDescription;
  players: ServerStatusPlayers;
  version: ServerStatusVersion;
  modinfo?: ServerStatusModinfo;
  favicon?: string;
  enforcesSecureChat?: boolean;
};
