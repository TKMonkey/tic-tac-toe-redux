import { IKeyValueStorage } from "./i_key_value_storage";

export class KeyValueStorageLocalStorage implements IKeyValueStorage {
  async save(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
  async readString(key: string): Promise<string> {
    return localStorage.getItem(key) || "";
  }
}
