import { DatabaseService } from './databaseService';
import { createHandyClient, IHandyRedis } from 'handy-redis';
import { Identifiable } from '../models/identifiable';

export class Redis implements DatabaseService<Identifiable> {

    private redisClient: IHandyRedis;

    constructor() {
        this.redisClient = createHandyClient(65433);
    }

    public getOne(id: string): Identifiable {
        const identifiable: Identifiable = {
            id,
        };
        return identifiable;
    }

    public getMany(ids: string[]): Identifiable[] {
        return ids.map((id) => {
            return { id };
        });
    }

    public async getAll(): Promise<Identifiable[]> {
        const result: any = await this.redisClient.hgetall('users');
        const res: Identifiable[] = Object.keys(result).map((key) => JSON.parse(result[key]));
        return res;
    }

    public async insertOne(element: Identifiable): Promise<Identifiable> {
        const success = this.redisClient.hset('users', element.id, JSON.stringify(element));
        if (!success) {
            throw new Error('Not inserted');
        }
        const res = await this.redisClient.hget('users', element.id);
        if (!res) {
            throw new Error('Not inserted');
        }
        const insertedIdentifiable: Identifiable = JSON.parse(res);
        return insertedIdentifiable;
    }

    public insertMany(elements: Identifiable[]): Identifiable[] {
        return elements;
    }
}
