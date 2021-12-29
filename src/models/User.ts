import { Directive, Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Models.
import Role from './Role';

@Directive('@key(fields: "id")')
@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

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

  @Field(() => [Role])
  @ManyToMany(() => Role, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  roles: Role[];

  @Field(() => Date)
  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Field(() => Date)
  @Column({
    nullable: false,
  })
  updatedAt: Date;
}
