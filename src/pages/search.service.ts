import busroutelist from "../data/bustlist";
import { BusStops } from "../models/busstops.model";

const getFormattedEta = (dateFuture: any) => {
  const dateNow: any = new Date();
  const seconds: number = Math.floor((dateFuture - (dateNow)) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  hours = hours - (days * 24);
  minutes = minutes - (days * 24 * 60) - (hours * 60);
  return minutes;
}


const searchAvailability = (busnumber: string) => {
  // console.log(busnumber);
  const buses = busroutelist.filter(bus => bus.busNumber === busnumber);
  if (buses.length === 0) return [];
  const busestoreturn = [];
  let randonmIndex1 = Math.floor(Math.random() * (buses[0].stops.length - 0));
  // console.log(rand)
  let time = 45;
  let busstops = buses[0].stops;
  for (let i = 0; i < 3; i++) {
    const originTime1 = new Date();
    originTime1.setMinutes(originTime1.getMinutes() - time);
    const stops1: Array<BusStops> = busstops.map((stop, index) => {
      originTime1.setMinutes(originTime1.getMinutes() - Math.floor(Math.random() * (13 - 4)));
      return {
        name: stop,
        crossed: index < randonmIndex1,
        crossedAt: getFormattedEta(originTime1),
      }
    })
    const bus1 = {
      number: busnumber,
      currentStop: stops1.find(stop => stop.crossed === false)?.name,
      eta: getFormattedEta(originTime1.setMinutes(originTime1.getMinutes() + 20)),
      selected: false,
      source: buses[0].source,
      destination: buses[0].destination,
      stops: stops1
    }
    busestoreturn.push(bus1);
    time -= 15;
    randonmIndex1 = Math.floor(Math.random() * (buses[0].stops.length - randonmIndex1));
  }

  let reversestops = busstops.reverse()
  randonmIndex1 = 4;
  time = 15;
  for (let i = 0; i < 3; i++) {
    const originTime1 = new Date();
    originTime1.setMinutes(originTime1.getMinutes() - time);
    const stops1: Array<BusStops> = reversestops.map((stop, index) => {
      originTime1.setMinutes(originTime1.getMinutes() - Math.floor(Math.random() * (13 - 4)));
      return {
        name: stop,
        crossed: index < randonmIndex1,
        crossedAt: getFormattedEta(originTime1),
      }
    })
    const bus1 = {
      number: busnumber,
      currentStop: stops1.find(stop => stop.crossed !== false)?.name,
      eta: getFormattedEta(originTime1.setMinutes(originTime1.getMinutes() + 20)),
      selected: false,
      source: buses[0].destination,
      destination: buses[0].source,
      stops: stops1
    }
    busestoreturn.push(bus1);
    time += 15;
    randonmIndex1 = Math.floor(Math.random() * (buses[0].stops.length - randonmIndex1));
  }
  return busestoreturn;
}

export default searchAvailability;