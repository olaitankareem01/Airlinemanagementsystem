const express = require('express');

const AirCraftManager = require ('../models/aircraft.js');
const FlightManager = require ('../models/flight.js');
const router = express.Router();
const aircraftmanager = new AirCraftManager();
const flightmanager = new FlightManager();

router.get('/adminmenu',  function(req, res)
{
    res.render('menu');
});
/*router.get('/', async function(req, res)
{
    let AvailableTaKeoffpoints = await flightmanager.listTakeoffpoints();
    let AvailableDestinations = await flightmanager.listDestinations();
    res.render('createflight'/*, {data: AvailableTaKeoffpoints[0]},{data: AvailableDestinations[0]}*//*);

});
/*router.post('/', async function(req,res){
    let takeoffpoint = req.body.takeoffpoint;
   // let takeofftime = req.body.takeofftime;
    let landingpoint = req.body.landingpoint;
    let availableFlight = await flightmanager.searchflight(takeoffpoint,landingpoint);
    if (availableFlight == null || availableFlight == undefined){
         res.status(404).send("There is no available Flight with this information")
    }
    else 
    {
      res.render('availableflights', availableFlight);
    }

});*/

router.get('/availableflights', async function(req,res){
    let result = await flightmanager.list();
    res.render('availableflights', {data : result[0]});
});
router.get('/manageflights',function(req,res){
    res.render('manageflight');
});
router.get('/manageflights/create', async function(req, res)
{
    let aircrafts = await aircraftmanager.list();
    res.render('createflight', {data: aircrafts[0]});
});
router.get('/flights', async function(req,res){
    let result = await flightmanager.list();
    res.render('listflights', {data : result[0]});
});
router.post('/manageflights/create',function(req,res){
    let flightno = req.body.flightno;
    let takeoffpoint = req.body.takeoffpoint;
    let takeofftime = req.body.takeofftime;
    let landingpoint = req.body.landingpoint;
    let aircraft_id = req.body.aircraft_id;
    flightmanager.create(flightno,takeoffpoint, takeofftime,landingpoint,aircraft_id);
    res.redirect('/flights');

});
router.get('/manageflights/update/:ID', async function(req,res){
    let ID = req.params.ID;
    let flight= await flightmanager.find(ID);
   if(flight == null || flight == undefined)
   {
       res.status(404).send("Flight is not found");
   }
   else
   {
       res.render("updateflight", flight);
   }

});
router.get('/manageflights/delete/:ID', async function(req,res){
    let ID = req.params.ID;
    let flight = await flightmanager.find(ID);
    if(flight == null || flight == undefined)
    {
        res.status(404).send("Flight is not found");
    }
    else
    {
        await flightmanager.Remove(ID);
        res.redirect('/flights');
    }
    
});


router.post('/manageflights/update', function(req,res){
    let ID = req.body.ID;
    let flightno = req.body.flightno;
    let takeoffpoint = req.body.takeoffpoint;
    let takeofftime = req.body.takeofftime;
    let landingpoint = req.body.landingpoint;
    let aircraft_id = req.body.aircraft_id;
    flightmanager.update(ID,flightno,takeoffpoint, takeofftime,landingpoint,aircraft_id);
    res.redirect('/flights');
});
module.exports = router;

