import { queryField, stringArg } from "nexus";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { z } from "zod"


export default queryField('getDomain', {
    type: 'String',
    args: {
        email: stringArg(),
    }
    }
)


const typeDefinitions = /* GraphQL */ `
  type Query {
    getDomain(email: String!): String
  }
`
 
const resolvers = {
  Query: {
    getDomain: (_parent: any, { email }: {email: string}) => {
      const fmt = z.string().email()
      const result = fmt.safeParse(email);

      if(result.success) {
        return email.split('@')[1];
      }
    },
  },
};

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
