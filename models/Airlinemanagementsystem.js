let fs = require('fs');
let AirCraftManager = require ('./aircraft.js');
plane = new AirCraftManager();
let PassengerManager = require ('./Passengers.js');
passenger = new PassengerManager();
let FlightManager = require('./flight.js');
Journey = new  FlightManager();
let Bookingmanager = require('./Booking.js');
const { resolve } = require('path');
book = new Bookingmanager();

const readline = require('readline').createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)

const print = console.log

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function prompt(text) {
    let result = ""
    readline.question(text, (entry) =>
    {
        result = entry
    })

    while(result === "")
    {
        await sleep(100)
    }

    return result
}
async  function Mainmenu(){
    console.log("Enter 0 to exit");
    console.log("Enter 1 to manage Aircrafts");
    console.log("Enter 2 to manage Flights");
    console.log("Enter 3 to manage Bookings");
    console.log("Enter 4 to manage passengers");
}

async function main(){
    Mainmenu();
    let option = await prompt("Please enter any of the options above:")
   
       if (option == 0){
           return;
       }
     else {
           await showsubmenu(option);
      }
    }

 main();
 async function showsubmenu(option){
     
    if (option == 1){
        aircraftmenu();
       let newoption = await prompt ("please enter any of the options above:"); 
    
          if (newoption == 0){
              return;
          }
          else{
               await aircraftsubmenu(newoption);
             }
           }
       else if(option == 2){
            await flightmenu();
        let newoption= await prompt("please enter any of the options above:");
                if (newoption == 0){
                    return;
                   }
                else{
                    await flightsubmenu(newoption);
                   }
         }

        else if(option == 3){
            await  Bookmenu();
            let newoption = await prompt("please enter any of the options above:") 
                 if (newoption == 0){
                     return;
                 }
                 else{
                    await Booksubmenu(newoption);
                 }
           }
        else if(option == 4){
              await  passengermenu();
          let newoption = await prompt("please enter any of the options above:") 
                 if (newoption == 0){
                     return;
                 }
                 else{
                await passengersubmenu(newoption);
                 }
          }
 }
 
 
  async function flightmenu(){
            console.log("Enter 0 to exit");
            console.log("Enter 1 to create flight");
            console.log("Enter 2 to update Flight");
            console.log("Enter 3 to display flight details");
            console.log("Enter 4 to delete flight details");
        }
 async function flightsubmenu(option){
             if (option == 1){
                 let flightno =  await prompt("please specify the flightno:");
                 let AircraftNo = await prompt("please specify the aircraft number:");
                 let TakeOffPoint = await  prompt("please specify the Takeoff point:");
                 let TakeOffTime = await  prompt("please specify the Takeoff time:");
                 let landingpoint =await  prompt("please specify the landing point:");
                Journey.create(flightno,AircraftNo, TakeOffPoint, TakeOffTime,landingpoint);
                console.log("flight has successfully been created");             
            }
           else if (option == 2){
            let flightno = await prompt("please specify the flightno:");
            let AircraftNo = await prompt("please specify the aircraft number:");
            let TakeOffPoint = await prompt("please specify the Takeoff point:");
            let TakeOffTime = await prompt("please specify the Takeoff time:");
            let landingpoint = await prompt("please specify the landing point:");
            Journey.update(flightno,AircraftNo, TakeOffPoint, TakeOffTime,landingpoint);  
            console.log("your flight details has been sucessfully updated");             
            }
            else if(option == 3){
               console.log(Journey.list())
            }
             else if(option == 4){
               let flightno =await prompt("'please specify the flight number")  
                Journey.Remove(flightno); 
                console.log("your flight details has been sucessfully deleted");  
             }
     }
async function aircraftmenu(){
    console.log("Enter 0 to exit");
    console.log("Enter 1 to create Aircraft");
    console.log("Enter 2 to update Aircraft list");
    console.log("Enter 3 to display Aircraft list");
    console.log("Enter 4 to delete Aircraft");
}

async function aircraftsubmenu(option){
    if (option == 1){
        let aircraftno = await prompt("'please specify the aircraft number:");   
        let Name = await prompt("'please specify the aircraft's name:");                    
        let Type = await prompt("'please specify the aircraft type:");   
        let Capacity =await prompt("'please specify the capacity of the aircraft:");      
        plane.create(aircraftno, Name, Type, Capacity);  
        console.log("your aircraft details has been sucessfully created");            
    }
    else if (option == 2){
        let aircraftno =await prompt("'please specify the aircraft number:")     
        let Name = await prompt("'please specify the aircraft's name:")                    
        let Type =  await prompt("'please specify the aircraft type:")    
        let Capacity = await prompt("'please specify the capacity of the aircraft:")      
        plane.update(aircraftno, Name, Type, Capacity);
        
    }
    else if (option == 3){
        plane.list();
    }
    else if(option == 4){
        let aircraftno = await prompt("'please specify the aircraft number");
        plane.Remove(aircraftno);
        console.log("your aircraft has been sucessfully deleted"); 
    }

}
async function Bookmenu(){
    console.log("Enter 0 to exit");
    console.log("Enter 1 to book flight");
    console.log("Enter 2 to update bookings");
    console.log("Enter 3 to display booking details");
    console.log("Enter 4 to delete booking details");
}
async function Booksubmenu(option){
    if (option == 1){
        let bookingid = await prompt("'please specify the Booking ID:")     
        let passengerid = await prompt("'please specify the passenger's ID:")                    
        let bookersname = await prompt("'please specify the Take-off point:")    
        let flightno = await prompt("'please specify the Take-off Time:")      
        let seatno = await prompt("'please specify the Landing point:")
        book.create(bookingid,passengerid,bookersname,flightno,seatno); 
        console.log("your booking details has been sucessfully created");             
    }
   else if (option == 2){
    let bookingid = await prompt("'please specify the Booking ID:")     
    let passengerid = await prompt("'please specify the passenger's ID:")                    
    let bookersname = await prompt("'please specify the Take-off point:")    
    let flightno = await prompt("'please specify the Take-off Time:")      
    let seatno = await prompt("'please specify the Landing point:")
    }
    else if (option == 3){
        book.list();
    }
    else if (option == 4){
        let bookingid = await  prompt("please enter the bookingid");
        book.Remove(bookingid);
        console.log("your  booking details has been sucessfully deleted"); 

    }
}

async function passengermenu(){
    console.log("Enter 0 to exit");
    console.log("Enter 1 to create passenger details");
    console.log("Enter 2 to update Passenger details");
    console.log("Enter 3 to display passenger details");
    console.log("Enter 4 to delete passenger");
}
async function passengersubmenu(option){
    if (option == 1){
        let Id =  await prompt("'please enter passenger's Id:")     
        let Name = await prompt("'please enter passenger's name:")                    
        let Email = await prompt("'please enter passenger's email:")    
        let Capacity = await prompt("'please enter passenger's phone number:");     
        passenger.create(Id, Name, Email, Capacity);  
        console.log("your details has been sucessfully created"); 
     }
     else if (option == 2){
        let Id = await prompt("'please enter passenger's Id:")     
        let Name = await prompt("'please enter passenger's name:")                    
        let Email = await prompt("'please enter passenger's email:")    
        let Capacity = await prompt("'please enter passenger's phone number:");    
        passenger.update(Id, Name, Email, Capacity); 
          
     }
    else if (option == 3){
        passenger.list();
    }
    else if (option == 4){
        let Id = await prompt("'please enter passenger's Id");
        passenger.Remove(Id);
        console.log("your details has been sucessfully deleted"); 
        
    }
 }
 

 