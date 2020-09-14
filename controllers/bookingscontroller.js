const express = require('express');

const FlightManager = require('../models/flight.js');
const Bookingmanager = require('../models/Booking.js');
const router = express.Router();
const flightmanager = new FlightManager();
const bookingmanager = new Bookingmanager();
const PassengerManager = require('../models/Passengers.js');
const passengermanager = new PassengerManager();


router.get('/managebookings', function (req, res) {
    res.render('managebooking');
});
router.get('/managebookings/create', async function (req, res) {
    let flights = await flightmanager.list();
    res.render('bookflight', { data: flights[0] });
});
router.post('/managebookings/create', async function (req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone_no = req.body.phone_no;
    let age = req.body.age;
    let sex = req.body.sex;
    console.log(email);
    let checkEmail = await passengermanager.checkEmail(email);
    if (checkEmail) {
        await passengermanager.update(firstname, lastname, email, phone_no, age, sex)
    }
    else {
        await passengermanager.create(firstname, lastname, email, phone_no, age, sex);
    }
    let passenger_id = await passengermanager.findByEmail(email);
    console.log(passenger_id);
    let flight_id = req.body.flight_id;
    let seatno = req.body.seatno;
    await bookingmanager.create(passenger_id, flight_id, seatno);
    res.redirect(`/managebookings/bookstage3/${passenger_id}`);
});

router.get('/managebookings/bookstage3/:ID', async function (req, res) {
    let ID = req.params.ID;
    /*let email = req.body.email;
    let passenger_id = await passengermanager.findByEmail(email);*/
    let details = await bookingmanager.processBookings(ID)
    console.log(details);
    res.render('bkflightstage3', details);

});

router.get('/managebookings/list', async function (req, res) {
    let result = await bookingmanager.list();
    res.render('listbookings', { data: result[0] }/* { data: result[1] }*/);
});
router.get('/managebookings/update/:ID', async function (req, res) {
    let ID = req.params.ID;
    let booking = await bookingmanager.find(ID);
    if (booking == null || booking == undefined) {
        res.status(404).send("Booking is not found");
    }
    else {
        res.render('updatebooking', booking);
    }

});
router.post('/managebookings/update', function (req, res) {
    let ID = req.body.ID;
    let bookingno = req.body.bookingno;
    let passenger_id = req.body.passenger_id;
    let flight_id = req.body.flight_id;
    let seatno = req.body.seatno;
    bookingmanager.update(ID, bookingno, passenger_id, flight_id, seatno);
    res.redirect('/managebookings/list');
});

router.get('/managebookings/delete/:ID', async function (req, res) {
    let ID = req.params.ID;
    let Booking = await bookingmanager.find(ID);
    if (Booking == null || Booking == undefined) {
        res.status(404).send("Booking is not found");
    }
    else {
        await bookingmanager.Remove(ID);
        res.redirect('/managebookings/list');
    }
});

module.exports = router;