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
    
    find(Id)
    {
        return this.Passengers.find(a => a.Id == Id);
    }
     create(Id,name,email,phoneno){
         let P = new Passengers(Id,name,email,phoneno);
         this.Passengers.push(P);
     }
     update(Id,name,email,phoneno)
     {
          let passenger = this.Passengers.find(Id);
          if(!passenger)
          {
              console.log ("passenger with ${Id} could not be found")
              return;
          }
          let P = new Passengers(Id,name,email,phoneno);
         this.Passengers.push(P);
     }
     list()
    {
        this.Passengers.forEach(P => 
            {
                console.log(P)
            });
    }
    Remove(Id){
        for (index in this.Passengers){
            if (index === this.Passengers.find(Id)){
              delete this.Passengers[index];
            }
            return;
        }
    }
}

module.exports = PassengerManager