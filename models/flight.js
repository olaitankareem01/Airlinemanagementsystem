
let AirCraftManager = require ('./aircraft.js');
const connection = require('../database/dbconnection.js');
aircraftmanager= new AirCraftManager();
class FlightManager
{
    Flights = [];
    
   async find(ID)
    {
        let findquery = `SELECT * FROM flights WHERE ID =${ID}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }
    async searchflight(takeoffpoint,landingpoint,takeofftime){
          let searchquery = `SELECT * FROM flights WHERE takeoffpoint ='${takeoffpoint}' AND landingpoint='${landingpoint}' AND takeofftime ='${takeofftime}'`;
          let result = await connection.query(searchquery);
          return result[0][0];
    }
  /* async  listTakeoffpoints(){
    let selectQuery = `SELECT takeoffpoint FROM flights`;
    let result = await connection.query(selectQuery);
    return result;
       }*/
    async  getAvailableFlights(){
        let selectQuery = `SELECT takeoffpoint,landingpoint FROM flights`;
        let result = await connection.query(selectQuery);
        return result;
           }

 async create(flightno,takeoffpoint, takeofftime,landingpoint,aircraft_id){
        let findquery = `SELECT aircraft.aircraftno FROM aircraft INNER JOIN flights ON flights.aircraft_id = aircraft.ID WHERE aircraft.ID = ${aircraft_id}`;
        let result = await connection.query(findquery);
       if (result == null){
            console.log(`Aircraft with ${aircraft_id} could not be found`)
             return;      
       }
       else {
        let insertQuery = `INSERT INTO flights (flightno,takeoffpoint,takeofftime,landingpoint,aircraft_id) VALUES(${flightno},'${takeoffpoint}', '${takeofftime}','${landingpoint}',${aircraft_id})`;
        connection.query(insertQuery);
        }
 }

    update(ID,flightno, takeoffpoint, takeofftime,landingpoint,aircraft_id)
    {
        
         let updateQuery = `UPDATE flights SET flightno=${flightno}, takeoffpoint='${takeoffpoint}',takeofftime='${takeofftime}',landingpoint='${landingpoint}',aircraft_id =${aircraft_id} WHERE ID = ${ID}`;
        connection.query(updateQuery);
         
    }

   async list()
    {
    let selectQuery = 'SELECT * FROM flights';
    let result = await connection.query(selectQuery);
    return result;
    }
 
   async Remove(ID){
            let deleteQuery = `DELETE  FROM flights WHERE ID = ${ID}`;
            let result = await connection.query(deleteQuery);
            return result;
         }

}

class Flight
{
    constructor(flightno, airCraftno, TakeOffPoint, TakeOffTime, landingpoint)
    {
        this.flightno = flightno;
        this.airCraftno = airCraftno;
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