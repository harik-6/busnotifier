import { BusStops } from "./busstops.model";

export interface Bus {
  number: string,
  currentStop: string,
  eta: Date,
  selected: boolean,
  source: string,
  destination: string,
  stops: Array<BusStops>
}