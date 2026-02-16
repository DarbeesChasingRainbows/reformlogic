import { App, staticFiles } from "fresh";
import { define, type State } from "./utils.ts";

export const app = new App<State>();

app.use(staticFiles());

app.use(define.middleware((ctx) => {
  ctx.state.shared = "reformlogic";
  return ctx.next();
}));

app.fsRoutes();
