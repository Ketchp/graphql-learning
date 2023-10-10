import { makeSchema } from 'nexus';
import path from 'path';
import getDomain from './resolvers/domain/queries/getDomain';
import nexusZodValidationSchemaPlugin from './plugins/validationSchema';

export default makeSchema({
  types: [getDomain],
  outputs: {
    schema: path.join(__dirname, '../schema.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  plugins: [nexusZodValidationSchemaPlugin()]
});
