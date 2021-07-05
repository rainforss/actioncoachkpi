import { IsNotEmpty } from "class-validator";
import { Entity, Column } from "typeorm";
import { Metric } from "./Metric";

@Entity()
export class SalesLadder {
  @Column(() => Metric)
  @IsNotEmpty()
  actionclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  growclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  planningclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  profitclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  mentorclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  bookclub: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  alignrich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  businessrich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  financerich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  phonerich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  teamrich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  timerich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  salesrich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  servicerich: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  leverage_game_nights: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  five_ways_seminar: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  six_steps_seminar: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  engage_and_grow: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  bucketlist_life: Metric;
}
