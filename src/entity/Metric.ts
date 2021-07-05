import { IsNotEmpty } from "class-validator";
import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Metric {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty()
  quantity?: string;

  @Column()
  @IsNotEmpty()
  total_amount?: string;
}
