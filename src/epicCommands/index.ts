import { genericCommands } from "../utils/genericCommands";

export const epicCommands = genericCommands(
  [["rick", import("./rick")]],
  "epic commands:"
);
