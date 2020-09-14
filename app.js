const express = require('express');
const bodyparser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const app = express();
const port = 3000;
const UsersManager = require('./models/users.js');
const usersmanager = new UsersManager();
const FlightManager = require('./models/flight.js');
const flightmanager = new FlightManager();


app.use(express.static(__dirname + '/public'));



app.use(bodyparser());
app.use(session({
    saveUninitialized: true,
    secret: '123456',
    resave: true
}));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
function auth(req, res, next) {
    if (req.session.isLoggedIn == true) {
        next();
    }
    else {
        res.redirect('/users/login')
    }
}


app.get('/*', function (req, res, next) {
    res.locals.name = req.session.name;
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next();
})
app.get('/', async function (req, res) {
    let AvailableFlights = await flightmanager.getAvailableFlights();
    res.render('searchflight', { data: AvailableFlights[0] });
});
app.post('/', async function (req, res) {
    let takeoffpoint = req.body.takeoffpoint;
    let takeofftime = req.body.takeofftime;
    let landingpoint = req.body.landingpoint;
    let result = await flightmanager.searchflight(takeoffpoint, landingpoint, takeofftime);
    if (result == null || result == undefined) {
        res.status(404).send("There is no available Flight with this information")
    }
    else {
        res.render('searchresult', result);
    }

});
/*app.get('/admin', function (req, res) {
    res.render('backend', { layout: 'backend.hbs' });
});*/

app.get('/contact', function (req, res) {
    res.render('contact');
})




app.get('/manageaircrafts', auth);
app.get('/aircrafts', auth);
app.get('/manageaircrafts/*', auth); ''

app.get('/manageflights', auth);
app.get('/manageflights/*');
app.get('/manageflights/create', auth);

app.get('/managebookings', auth);
app.get('/managebookings/*');

app.get('/managepassengers', auth);
app.get('/passengers');
app.get('/managepassengers/*');

app.use(require('./controllers/aircraftsController'));
app.use(require('./controllers/usersController'));
app.use(require('./controllers/flightsController'));
app.use(require('./controllers/bookingsController'));
app.use(require('./controllers/passengersController'));

app.listen(port);
console.log('App listing on http://localhost:3000');