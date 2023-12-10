export declare class LocalStorage {
    static getItem<T = unknown>(key: string): T;
    static setItem(key: string, value: unknown): void;
    static removeItem(key: string): void;
    static clear(): void;
}
