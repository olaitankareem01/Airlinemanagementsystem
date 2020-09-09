

const express = require('express');
const bycryt = require('bcrypt');
const UsersManager = require('../models/users.js');
const router = express.Router();
const session = require('express-session')
const usersmanager = new UsersManager();



router.get('/users/signup', function(req, res) 
{
    res.render('usersignup');
});  
router.post('/users/signup', async function(req,res){
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone_no = req.body.phone_no;
    let password = req.body.password1;
    let password2 = req.body.password2;
    if(email.indexOf('@') < 0)
    {
        let message = "Email is invalid";
        res.render("usersignup", {'message': message});
        return;
    }
    if(password != password2)
    {
        let message = "Your password does not match";
        res.render("usersignup", {'message': message});
        return;
    }
    let existingUsersmail = await usersmanager.checkemail(email);
    if(existingUsersmail.length > 0)
    {
        let message = "This email has already been taken";
        res.render("usersignup", {'message': message});
        return;
    }
    let hashedpassword = await bycryt.hash(password, 10);
    usersmanager.create(firstname,lastname,email,phone_no,hashedpassword);
    let message = "Your account has been created";
    res.render("usersignup", {'message': message});
    res.redirect('/users/login');

    }); 
    
router.get('/users/login', function(req, res)
    {
        res.render('userlogin');
    });  
 router.post('/users/login', async function(req,res){
        let email = req.body.email;
        let password = req.body.password;
        let user = await usersmanager.findByEmail(email);
        if(user == null || user == undefined)
        {
            let message = "Incorrect email or password";
            res.render("userlogin", {'message': message});
            return;
        }
        else
        {
         let isCorrect = await bycryt.compare(password, user.password);
         if(isCorrect == true){
            req.session.userid = user.ID;
            req.session.isLoggedIn  = true;
            req.session.name = `${user.firstname}`;
            req.session.email = user.email;
            res.redirect('/');
           }
           else{
           let message = "Incorrect email or password";
           res.render("userlogin", {'message': message});
           return;
            }
        }
    }); 
        
module.exports = router;