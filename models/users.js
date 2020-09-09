const connection = require('../database/dbconnection');

class users{
    constructor(ID,firstname,lastname,email,phone_no){
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone_no = phone_no;
    }
}

class UsersManager{

    async find(ID)
    {
        let findquery = `SELECT * FROM users WHERE ID = ${ID}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }

    async findByEmail(email)
    {
        let findquery = `SELECT * FROM users WHERE email = '${email}'`;
        let result = await connection.query(findquery);
        return result[0][0];
    }
    async find(email, password)
    {
        let findquery = `SELECT * FROM users WHERE email = '${email}' and password = '${password}'`;
        let result = await connection.query(findquery);
        return result[0][0];
    }
   async checkemail(email)
        {
        let emailquery = `SELECT * FROM users WHERE email = '${email}'`;
        let result = await connection.query(emailquery);
        return result[0];
        }
    create(firstname,lastname,email,phone_no,password)
    {
     
        let insertQuery = `INSERT INTO users (firstname,lastname,email,phone_no,password) VALUES( '${firstname}', '${lastname}', '${email}', '${phone_no}','${password}')`;
        connection.query(insertQuery);
    }

}
module.exports = UsersManager;