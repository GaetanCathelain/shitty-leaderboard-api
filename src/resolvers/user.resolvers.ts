import { Redis } from "../database/redisService";
import uuid = require("uuid");
import { User } from "../models/identifiable";

export default {
  Query: {
    user: (id: string) => new Redis().getOne(id),
    users: () => new Redis().getAll()
  },
  Mutation: {
    post: (parent: any, args: any) => {
      const id = uuid.v4();
      const username: string = args.username;
      const res = new Redis().insertOne({ id, username } as User);
      return res;
    }
  }
};
