const connection = require('../database/dbconnection')
class AirCraftManager
{
           AirCrafts = [];
            
   async find(ID)
    {
        let findquery = `SELECT * FROM aircraft WHERE ID = ${ID}`;
        let result = await connection.query(findquery);
        return result[0][0];
    }

    create(aircraftno, name, type, capacity)
    {
     
        let insertQuery = `INSERT INTO aircraft (aircraftno, name, type, capacity) VALUES('${aircraftno}', '${name}', '${type}', ${capacity})`;
        connection.query(insertQuery);
    }

     async list()
     {
         let selectQuery = `SELECT * FROM aircraft`;
         let result = await connection.query(selectQuery);
         return result;
         
     }

      update(ID,aircraftno, name, type, capacity){
            let updateQuery = `UPDATE aircraft SET aircraftno = '${aircraftno}', name = '${name}', type = '${type}', capacity = ${capacity} where ID = ${ID}`;
             connection.query(updateQuery);
            }

            
    async Remove(ID){
        /*let findquery = `SELECT * FROM aircraft WHERE aircraftno =${aircraftno}`;
        let result =  await connection.query(findquery);
         if(result == null){
             console.log("There is no aircraft with this number");
         }
         else{*/
            let deleteQuery = `DELETE FROM aircraft WHERE ID = ${ID}`;
            let result = await connection.query(deleteQuery);
            return result;
        // }
    }
 
 }


class AirCraft{
    constructor(ID,aircraftno, Name, Type, Capacity)
    {
        this.ID = ID;
        this.Capacity = Capacity;
        this.Name = Name;
        this.Type = Type;
        this.aircraftno = aircraftno;
    }
}
module.exports = AirCraftManager;