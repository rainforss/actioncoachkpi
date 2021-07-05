import { IsNotEmpty } from "class-validator";
import { Entity, Column } from "typeorm";
import { Metric } from "./Metric";

@Entity()
export class MarketingSteps {
  @Column(() => Metric)
  @IsNotEmpty()
  number_of_marketing_strategies_used: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  number_of_lead_total: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  number_of_on_deck_calls: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  number_of_diagnostics: Metric;

  @Column(() => Metric)
  @IsNotEmpty()
  number_of_new_clients: Metric;
}
