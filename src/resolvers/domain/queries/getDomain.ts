import { queryField, nullable, stringArg } from "nexus";
import { z } from 'zod'


export default queryField('getDomain', {
    type: nullable('String'),
    args: {
        email: stringArg(),
    },
    validationSchema: z.object({email: z.string().email()}),

    resolve: (_parent, { email }) => {
        return email.split('@')[1];
    },
});
