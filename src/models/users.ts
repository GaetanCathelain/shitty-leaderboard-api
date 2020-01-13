import { RedisClient } from "redis";
import { stringify } from "querystring";
import { uuidv4 } from "uuid/v4";

const { ApolloServer, gql } = require("apollo-server");

interface User {
  id: string;
  username: string;
  upvote: number;
  downvote: number;
}

export class UserModel {
  private redisClient: RedisClient;
  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
  }

  // A schema is a collection of type definitions (hence "typeDefs")
  // that together define the "shape" of queries that are executed against
  // your data.
  userTypeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    type User {
      id: ID
      username: String
      upvote: Int
      downvote: Int
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
      users: [User]
    }

    type Mutation {
      addUser(username: String): User
    }
  `;

  userResolver = {
    Query: {
      users: this.getAllUsers
    }
  };

  addUser(username: string): User {
    const user = {
      id: uuidv4(),
      username: username,
      downvote: 0,
      upvote: 0
    };


    Object.keys(user)
      .filter(key => key !== "id")
      .forEach(key => {
        this.redisClient.hset(user.id, key, user[key]);
      });

    return user;
  }

  getUser(userId: any) {
    return this.redisClient.hgetall(userId);
  }

  getAllUsers() {
    this.redisClient.hscan();
  }
}
