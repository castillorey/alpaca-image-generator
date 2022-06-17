import { Feature } from "../models/feature.model";
import { Alpaca } from "../models/alpaca.model";

export class State {
  alpaca: Alpaca;
  features: Feature[];
  currentFeature: Feature;  
}
