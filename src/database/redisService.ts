import { DatabaseService } from './databaseService';
import { createHandyClient, IHandyRedis } from 'handy-redis';
import uuid = require('uuid');
import { User } from '../generated/graphql';

export class Redis implements DatabaseService<User> {

    private redisClient: IHandyRedis;

    constructor() {
        this.redisClient = createHandyClient(65433);
    }

    public getOne(id: string): User {
        const identifiable: User = {
            id,
        };
        return identifiable;
    }

    public getMany(ids: string[]): User[] {
        return ids.map((id) => {
            return { id };
        });
    }

    public getAll(): User[] {
        const result = this.redisClient.hgetall('users');
        return this.getMany(['1', '2', '3', '4']);
    }

    public async insertOne(element: User): Promise<User> {
        const id = uuid.v4();
        element.id = id;
        const success = this.redisClient.hset('users', id, JSON.stringify(element));
        if (!success) {
            throw new Error('Not inserted');
        }
        const res = await this.redisClient.hget('users', id);
        const insertedUser = JSON.parse(res);
        return insertedUser;
    }

    public insertMany(elements: User[]): User[] {
        return elements;
    }
}
