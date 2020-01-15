import { Redis } from '../db/redis';

export default {
    Query: {
        users: () => new Redis().getAll(),
        user: (id: string) => new Redis().getOne(id),
    }
};
