export interface BaseUseCase<I, O> {
  execute(input: I): O;
}
