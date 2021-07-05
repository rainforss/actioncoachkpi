import { IsNotEmpty, MaxLength } from "class-validator";
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty({ message: "First name cannot be empty" })
  @MaxLength(10, { message: "First name is too long" })
  firstName: string;

  @Column()
  @IsNotEmpty({ message: "Last name cannot be empty" })
  @MaxLength(10, { message: "Last name is too long" })
  lastName: string;
}
