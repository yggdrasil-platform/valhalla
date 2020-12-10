import {
  buildFederatedSchema as buildApolloFederationSchema,
  printSchema,
} from '@apollo/federation';
import { GraphQLResolverMap } from 'apollo-graphql';
import { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from 'type-graphql';

export interface BuildOptions extends Omit<BuildSchemaOptions, 'skipCheck'> {
  referenceResolvers?: GraphQLResolverMap<any>;
}

export default async function buildFederatedSchema(
  options: BuildOptions
): Promise<GraphQLSchema> {
  const { referenceResolvers, ...otherOptions } = options;
  const schema: GraphQLSchema = await buildSchema({
    ...otherOptions,
    skipCheck: true,
  });
  const federatedSchema: GraphQLSchema = buildApolloFederationSchema([
    {
      typeDefs: gql(printSchema(schema)),
      resolvers: createResolversMap(schema) as any,
    },
  ]);

  return federatedSchema;
}
