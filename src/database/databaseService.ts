export interface DatabaseService<T> {
    insertOne(element: T): Promise<T>;
    insertMany(elements: T[]): T[];
    getOne(id: string): T;
    getMany(ids: string[]): T[];
    getAll(): T[];
}