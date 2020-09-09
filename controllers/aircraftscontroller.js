const express = require('express');
const AirCraftManager = require ('../models/aircraft');
const router = express.Router();
const aircraftmanager = new AirCraftManager();

router.get('/manageaircrafts', function(req,res){
    res.render('manageaircraft');
 });
 
 router.get('/manageaircrafts/create', function(req, res)
 {
     res.render('createaircraft');
 });
 
 router.post('/manageaircrafts/create', function(req, res)
 {
     let name = req.body.name;
     let type = req.body.type;
     let capacity = req.body.capacity;
     let aircraftno = req.body.aircraftno;
     aircraftmanager.create(aircraftno, name, type, capacity);
     res.redirect('/aircrafts');
 });
 
 router.get('/manageaircrafts/update/:ID', async function(req,res){
      let ID = req.params.ID;
      let aircraft = await aircraftmanager.find(ID);
     if(aircraft == null || aircraft == undefined)
     {
         res.status(404).send("Aircraft is not found");
     }
     else
     {
         res.render('updateaircraft', aircraft);
     }
 
  
 });
 router.post('/manageaircrafts/update',function(req,res){
     let ID = req.body.ID;
     let name = req.body.name;
     let type = req.body.type;
     let capacity = req.body.capacity;
     let aircraftno = req.body.aircraftno;
     aircraftmanager.update( ID,aircraftno, name, type, capacity);
     res.redirect('/aircrafts');
 });
 router.get('/manageaircrafts/delete/:ID',  async function(req,res){
     let ID = req.params.ID;
     let aircraft = await aircraftmanager.find(ID);
     if(aircraft == null || aircraft == undefined)
     {
         res.status(404).send("Aircraft is not found");
     }
     else
     {
         await aircraftmanager.Remove(ID);
         res.redirect('/aircrafts');
     }
 });
 
 
 router.get('/aircrafts',  async function(req, res)
 {
     let result = await aircraftmanager.list();
     res.render('aircrafts', {data : result[0]});
 });
 module.exports = router;