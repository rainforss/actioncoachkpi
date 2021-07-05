import { IsNotEmpty } from "class-validator";
import { Entity, Column } from "typeorm";
import { Metric } from "./Metric";

@Entity()
export class Money {
  @Column(() => Metric)
  @IsNotEmpty()
  total_marketing_investment: Metric;
}
