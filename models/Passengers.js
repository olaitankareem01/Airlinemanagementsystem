const connection = require('../database/dbconnection.js');
class Passengers {
 constructor(Id,name,email,phoneno){
   this.Id = Id;
   this.name = name;
   this.email = email;
   this.phoneno = phoneno;
    }
}
class PassengerManager{
    Passengers = [];
    
   async find(ID)
    {
        let findquery = `SELECT * FROM passengers WHERE ID =${ID}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }
 async findByEmail(email){
       let findquery = `SELECT ID FROM passengers WHERE email = '${email}'`;
       let result= await connection.query(findquery);
       return result[0][0].ID;
 }
   async  create(firstname,lastname,email,phone_no,age,sex){
       /* let findquery2 = `SELECT bookings.bookingid FROM bookings INNER JOIN passengers ON passengers.booking_id = bookings.ID WHERE bookings.ID = ${booking_id}`;
        let result = await connection.query(findquery2);

     if (result == null) {
              console.log(`There's no booking with this ID ${booking_id} `)
              return; 
        }
        else {*/
        let insertQuery = `INSERT INTO passengers (firstname,lastname,email,phone_no,age,sex) VALUES('${firstname}', '${lastname}', '${email}', '${phone_no}',${age},'${sex}')`;
         return connection.query(insertQuery);
        
    }
 async update(ID,firstname,lastname,email,phone_no,age,sex)
     {
        let updateQuery = `UPDATE passengers SET ID = ${ID},firstname = '${firstname}', lastname ='${lastname}',email = '${email}', phone_no = '${phone_no}',age=${age},sex='${sex}' WHERE ID = ${ID}`;
         connection.query(updateQuery);
     }
async list()
    {
        let selectQuery = 'SELECT * FROM passengers';
        let result = await connection.query(selectQuery);
        return result;
    }
async Remove(ID){
       
            let deleteQuery = `DELETE FROM passengers WHERE ID=${ID}`;
            let result = await connection.query(deleteQuery);
            return result;
        }
    }


module.exports = PassengerManager