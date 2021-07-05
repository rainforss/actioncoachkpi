import { IsEmail, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { MarketingSteps } from "./MarketingSteps";
import { Money } from "./Money";
import { SalesLadder } from "./SalesLadder";

@Entity()
export class KpiEntry {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty()
  submitterName: string;

  @Column()
  @IsNotEmpty()
  submitterRole: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  submitterEmail: string;

  @Column()
  @IsNotEmpty()
  submitterId: string;

  @Column()
  @IsNotEmpty()
  submitterRegion: string;

  @Column()
  @IsInt()
  @Min(2000, { message: "Cannot enter year before 2000." })
  @Max(2100, { message: "Cannot enter year after 2100." })
  year: number;

  @Column()
  @IsNotEmpty()
  month: string;

  @Column()
  mlName: string;

  @Column()
  @IsNotEmpty()
  currency: string;

  @Column(() => SalesLadder)
  @IsNotEmpty()
  salesLadder: SalesLadder;

  @Column(() => MarketingSteps)
  @IsNotEmpty()
  marketingSteps: MarketingSteps;

  @Column(() => Money)
  @IsNotEmpty()
  money: Money;
}
