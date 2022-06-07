export interface IKeyValueStorage {
  save(key: string, value: any): Promise<void>;
  readString(key: string): Promise<string>;
}
