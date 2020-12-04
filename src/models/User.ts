import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Field(() => String)
  @Column({
    nullable: false,
  })
  firstName: string;

  @Field(() => String)
  @Column({
    nullable: false,
  })
  lastName: string;

  // @Authorized()
  @Field(() => String)
  @Column({
    nullable: false,
  })
  password: string;

  // @Field(() => String)
  // @Column({
  //   nullable: false,
  //   unique: true,
  // })
  // username: string;
}
