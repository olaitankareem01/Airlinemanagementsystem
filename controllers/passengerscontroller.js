const express = require('express');
const Bookingmanager = require('../models/Booking.js');
const PassengerManager = require('../models/Passengers.js');
const router = express.Router();
const bookingmanager = new Bookingmanager();
const passengermanager = new PassengerManager();


router.get('/managepassengers',function(req,res){
        res.render('managepassengers');
     });
router.get('/passengers', async function(req, res)
     {
        let result = await passengermanager.list();
        res.render('listpassenger', {data : result[0]});
     });
 /*router.get('/managepassengers/create', async function(req, res)
     {
         let bookings = await bookingmanager.list();
         res.render('addpassengers', {data: bookings[0]});
     });
 router.post('/managepassengers/create',function(req,res){
        let ID = req.body.ID;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone_no = req.body.phone_no;
        let age = req.body.age;
        let sex = req.body.sex;
        passengermanager.create(ID,firstname,lastname,email,phone_no,age,sex);
        res.redirect('/passengers');
    });*/
router.get('/managepassengers/update/:ID', async function(req, res)
    {
        let ID = req.params.ID;
        let passenger = await passengermanager.find(ID);
       if(passenger == null || passenger == undefined)
       {
           res.status(404).send("Passenger details not found");
       }
       else
       {
        res.render('updatepassengers', passenger);
       }
       
    });
router.post('/managepassengers/update',function(req,res){
    let ID = req.body.ID;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone_no = req.body.phone_no;
    let age = req.body.age;
    let sex = req.body.sex;
    passengermanager.update(ID,firstname,lastname,email,phone_no,age,sex);
       res.redirect('/passengers');
   });
router.get('/managepassengers/delete/:ID', async function(req,res){
    let ID = req.params.ID;
    let Passenger = await passengermanager.find(ID);
    if(Passenger== null || Passenger == undefined)
    {
        res.status(404).send("passenger is not found");
    }
    else
    {
        await passengermanager.Remove(ID);
        res.redirect('/passengers');
    }
});

module.exports = router;