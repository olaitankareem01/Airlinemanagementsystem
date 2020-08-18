let AirCraftManager = require ('./aircraft.js');
aircraftManager= new AirCraftManager();
class FlightManager
{
    Flights = [];

    find(flightno)
    {
        return this.Flights.find(a => a.flightno == flightno);
    }
    create(flightno,AircraftNo, TakeOffPoint, TakeOffTime,landingpoint){
        let flight = new Flight(flightno, AircraftNo, TakeOffPoint, TakeOffTime,landingpoint);
        this.Flights.push(flight);
    }

    update(flightno, AirCraftNo, TakeOffPoint, TakeOffTime,landingpoint)
    {
         let aircraft = aircraftManager.find(AirCraftNo);
         if(!aircraft)
         {
             console.log(`Aircraft with ${AirCraftNo} could not be find`);
             return;
         }
         let flight = new Flight(flightno, aircraft, TakeOffPoint, TakeOffTime,landingpoint);
        this.Flights.push(flight);
    }

    list()
    {
        this.Flights.forEach(flight => 
            {
                console.log(flight)
            });
    }
 
    Remove(flightno){
        for (index in this.AirCrafts){
            if (index === this.AirCrafts.find(flightno)){
              delete this.AirCrafts[index];
            }
            return;
        }
    }

}

class Flight
{
    constructor(flightno, AirCraftNo, TakeOffPoint, TakeOffTime, landingpoint)
    {
        this.flightno = flightno;
        this.AirCraftNo = AirCraftNo;
        this.TakeOffPoint = TakeOffPoint;
        this.TakeOffTime  =TakeOffTime;
        this.landingpoint = landingpoint;
    }
}
/*
let x = new FlightManager();
aircraftManager.create("002", "AircraftXYZ", "JET", 20);
x.add("12", "002", "", "989");
x.list();*/
module.exports = FlightManager