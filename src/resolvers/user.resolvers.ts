import { Redis } from "../database/redisService";
import { User } from "../generated/graphql";

export default {
  Query: {
    user: (id: string) => new Redis().getOne(id),
    users: () => new Redis().getAll()
  },
  Mutation: {
    post: (parent: any, args: any) => {
      const res = new Redis().insertOne({ username: args.user });
      return res;
    },
  },
};
