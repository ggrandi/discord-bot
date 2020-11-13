import { genericCommands } from "../utils/genericCommands";

export const epicCommands = genericCommands(
  [
    ["rick", import("./rick")],
    ["send100", import("./send100")],
  ],
  "epic commands:"
);
