import { GraphQLError } from 'graphql';
import { plugin } from 'nexus';
import { printedGenTyping, printedGenTypingImport } from 'nexus/dist/utils';
import path from 'path';
import { z } from 'zod';

export type ValidateResolver = z.Schema;

const nexusZodValidationSchemaPlugin = () =>
  plugin({
    name: 'validate-schema-zod',
    description: 'Validate the arguments passed to the resolver with zod schema.',
    fieldDefTypes: printedGenTyping({
      optional: true,
      name: 'validationSchema',
      description: 'Zod schema used for input validation.',
      type: 'ValidateResolver',
      imports: [
        printedGenTypingImport({ module: path.resolve(__dirname, __filename), bindings: ['ValidateResolver'] }),
      ],
    }),
    onCreateFieldResolver({ fieldConfig }) {
      return async (root, args, ctx, info, next) => {
        const validationSchema: z.Schema | undefined = fieldConfig.extensions?.nexus?.config?.validationSchema;

        if (validationSchema) {
          const validationResult = validationSchema.safeParse(args);

          if (!validationResult.success) {
            throw new GraphQLError(validationResult.error.message, {
              extensions: {
                code: 'BAD_USER_INPUT',
                argumentsValidations: validationResult.error,
              },
            });
          }
        }

        return await next(root, args, ctx, info);
      };
    },
  });

export default nexusZodValidationSchemaPlugin;