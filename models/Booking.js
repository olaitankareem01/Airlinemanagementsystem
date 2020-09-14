let AircraftManager = require('./aircraft.js');
aircraftmanager = new AircraftManager();
let FlightManager = require('./flight.js');
flightmanager = new FlightManager();
const PassengerManager = require('./Passengers.js');
const passengermanager = new PassengerManager();
const connection = require('../database/dbconnection.js');
class Booking {
    constructor(bookingid, bookersname, flightno, seatno) {
        this.bookingid = bookingid;
        this.bookersname = bookersname;
        this.flightno = flightno;
        this.seatno = seatno;
    }
}

class Bookingmanager {
    bookings = [];
    async find(ID) {
        let findquery = `SELECT * FROM bookings WHERE ID = ${ID}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }

    async findByPassengerid(passenger_id) {
        let findquery = `SELECT * FROM bookings WHERE passenger_id = ${passenger_id}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }
    async processBookings(passenger_id) {
        let result1 = await passengermanager.find(passenger_id);
        let result2 = await this.findByPassengerid(passenger_id);
        return result1;
    }
    async create(passenger_id, flight_id, seatno) {
        console.log(passenger_id, flight_id, seatno);
        let bookingno = "00" + Math.floor(Math.random() * Math.floor(1000));
        let findbookno = `SELECT bookingno FROM bookings WHERE bookingno = ${bookingno}`;
        let SearchedBookno = await connection.query(findbookno);
        if (bookingno == SearchedBookno) {
            bookingno = "00" + Math.floor(Math.random() * Math.floor(10000));
        }
        else {

            let findquery1 = `SELECT flights.flightno FROM flights INNER JOIN bookings ON bookings.flight_id = flights.ID WHERE flights.ID = ${flight_id}`;
            let result1 = await connection.query(findquery1);

            let findquery2 = `SELECT passengers.ID FROM passengers INNER JOIN bookings ON bookings.passenger_id = passengers.ID WHERE passengers.ID = ${passenger_id}`;
            console.log(findquery2);
            let result2 = await connection.query(findquery2);
            console.log(result2);
            if (result1 == null) {
                console.log(`flight with ${flight_id} could not be found`)
                return;
            }
            else {
                if (result2 == null || result2 == undefined) {
                    console.log(`The details for ${passenger_id} could not be found`)
                }
                else {
                    let insertQuery = `INSERT INTO bookings (bookingno,passenger_id,flight_id,seatno) VALUES('${bookingno}',${passenger_id},${flight_id},${seatno})`;
                    let result = await connection.query(insertQuery);
                    return result;
                }
            }

        }
        // }

    }
    async update(ID, bookingno, passenger_id, flight_id, seatno) {

        let updateQuery = `UPDATE bookings SET ID = ${ID}, bookingno = '${bookingno}',passenger_id = ${passenger_id} , flight_id = ${flight_id}, seatno = ${seatno} WHERE ID = ${ID}`;
        let result = await connection.query(updateQuery);
        return result;
    }

    async list() {
        let selectQuery = `SELECT  * FROM bookings`;
        let result = await connection.query(selectQuery);
        return result;
    }
    async Remove(ID) {
        let findquery = `SELECT * FROM  WHERE ID = ${ID}`;
        let result = await connection.query(findquery);
        if (result == null) {
            console.log("There is no booking with this ID");
        }
        else {
            let deleteQuery = `DELETE FROM bookings WHERE ID = ${ID}`;
            let result = await connection.query(deleteQuery);
            return result;
        }
    }
}


module.exports = Bookingmanager

