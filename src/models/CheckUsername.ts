import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class CheckUsername {
  @Field(() => Boolean)
  isAvailable: boolean;

  @Field(() => String)
  suggestion: string;
}
