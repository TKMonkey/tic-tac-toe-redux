import { BaseUseCase } from "./base_use_case";

export interface CommandUseCase<I> extends BaseUseCase<I, void> {}
