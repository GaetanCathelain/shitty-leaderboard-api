export interface DatabaseService<T> {
    getOne(id: string): T;
    getMany(ids: string[]): T[];
    getAll(): T[];
}