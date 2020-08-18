let AircraftManager = require ('./aircraft.js');
aircraftmanager = new AircraftManager();
let FlightManager = require('./flight.js');
flightmanager = new  FlightManager();

class Booking{
    constructor(bookingid,passengerid,bookersname,flightno,seatno){
          this.bookingid = bookingid;
          this.bookersname = bookersname;
          this.passengerid = passengerid;
          this.flightno = flightno;
          this.seatno = seatno;
    }
}

class Bookingmanager{
    bookings = [];
    find(id)
    {
        return this.Bookings.find(a => a.id == id);
    }
    create(bookingid,passengerid,bookersname,flightno,seatno){
       let Book = new Booking(bookingid,passengerid,bookersname,flightno,seatno);
        this.bookings.push(book);
    }
    update(bookingid,passengerid,bookersname,flightno,seatno){
       let  flight = flightmanager.find(flightno);
        if(flight == null){
            console.log("flight cannot be found");
            return;
        }
        let Book = new Booking(bookingid,passengerid,bookersname,flightno,seatno);
        this.bookings.push(book);
    }
    
       list()
           {
        this.Bookings.forEach(book => 
            {
                console.log(book)
            });
        }
         Remove(bookingid){
                for (index in this.bookings){
                    if (index === this.bookings.find(bookingid)){
                      delete this.bookings[index];
                    }
                    return;
                }
            }
}


module.exports = Bookingmanager

