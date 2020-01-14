import { Redis } from "./db/redis"

const { GraphQLServer } = require('graphql-yoga')
// 1
const typeDefs = `
type User {
  id: ID
  username: String
  upvote: Int
  downvote: Int
}

type Query {
  users: [User]
  user: User
}
`
// 2
const resolvers = {
  Query: {
    users: () => new Redis().getAll(),
    user: (id: string) => new Redis().getOne(id)
  }
}
// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
