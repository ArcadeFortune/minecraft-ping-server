import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
}

export const define = createDefine<State>();

export function respond(message: unknown, status: number, error: string | null = null, options: ResponseInit = {}) {
  return new Response(JSON.stringify({ message, error }), {
    status,
    ...options,
  });
}
