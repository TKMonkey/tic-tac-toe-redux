import { BaseUseCase } from "./base_use_case";

type CommandReturnType = void | Promise<void>;

export interface CommandUseCase<I, R extends CommandReturnType = void>
  extends BaseUseCase<I, R> {}
