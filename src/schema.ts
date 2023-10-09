import { makeExecutableSchema } from "@graphql-tools/schema"

const typeDefinitions = /* GraphQL */ `
  type Query {
    getDomain(email: String!): String
  }
`
 
const resolvers = {
  Query: {
    getDomain(_: any, { email }: {email: String}) {
      const expression: RegExp = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})$/i;

      const result = email.match(expression);

      if(!result)
        return null;

      return result[1];
    },
  },
};

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
