import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class Role extends BaseEntity {
  @Field(() => Boolean)
  @Column({
    default: true,
    nullable: false,
  })
  active: boolean;

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
  })
  name: string;
}
