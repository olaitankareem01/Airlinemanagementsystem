class AirCraftManager
{
           AirCrafts = [];
            
    find(aircraftno)
    {
        return this.AirCrafts.find(a => a.aircraftno == aircraftno);
    }

    create(aircraftno, Name, Type, Capacity)
    {
        let a = new AirCraft(aircraftno, Name, Type, Capacity);
        this.AirCrafts.push(a);
    }
   /* list()
    {
        this.AirCrafts.forEach(a => 
            {
                console.log(this.Aircrafts)
            });
        }*/
     list(){
         if (this.Aircrafts == null){
             console.log("there is no aircraft");
         }
         else{
            this.Flights.forEach(a => 
                {
                    console.log(a);
                });
              }
     }
    update(aircraftno, Name, Type, Capacity){
        let a = this.AirCrafts.find(aircraftno);
        if (a == null){
             console.log("There is no aircraft with this number");
             return;
        } 
         else{
             a.aircraftno = aircraftno;
             a.Name = Name;
             a.Type = Type;
             a.Capacity = Capacity;
         }
    }
    Remove(aircraftno){
        let a = this.Aircrafts.find(aircraftno);
         if(a == null){
             console.log("There is no aircraft with this number");
         }
         else{
        delete Aircrafts.a;
         }
    }
}


class AirCraft{
    constructor(aircraftno, Name, Type, Capacity)
    {
        this.Capacity = Capacity;
        this.Name = Name;
        this.Type = Type;
        this.aircraftno = aircraftno;
    }
}

/*let aircraft = new AirCraftManager();
aircraft.create(23,"rahman","arik",345,);
aircraft.create(34,"kareem","airways",564);
aircraft.list();
aircraft.update(34,"kareem","airways",564);
aircraft.list();*/
module.exports = AirCraftManager