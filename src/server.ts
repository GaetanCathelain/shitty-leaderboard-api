import { GraphQLServer } from 'graphql-yoga';
import { default as typeDefs } from './typeDefs';
import { default as resolvers } from './resolvers';

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
