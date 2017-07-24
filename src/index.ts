{
 interface IFighter {
    name: string;
    power: number;
    health: number;
    setDemage:(demage:number) => void;
    hit: (enemy,point:number) => void;
}



    class Fighter  implements IFighter{
        name: string;
        power: number;
        health: number;
            constructor(name:string,power:number=10,health:number=2000){
                    this.name   = name;
                    this.power  = power;
                    this.health = health;
                }

                setDemage(damage:number):void{
                    this.health = this.health  - damage;
                    console.log(`name: ${this.name} ,health: ${this.health}`)
                }

                hit(enemy:Fighter|ImproveFighter,point:number):void{
                    console.warn(`${this.name} hits ${enemy.name} by ${point*this.power}`)
                    enemy.setDemage(point*this.power)
                    }
                }

        class ImproveFighter extends Fighter {
            doubleHit(enemy:Fighter|ImproveFighter,point:number):void{
                super.hit(enemy,(2*point)*this.power)
            }
        }


  


        class fight  {
            player1 : Fighter | ImproveFighter;
            player2 : Fighter | ImproveFighter;
            points  : number[]

            constructor(name1: Fighter | ImproveFighter,name2:Fighter | ImproveFighter,...points:number[]){
                this.player1 = name1
                this.player2 = name2
                this.points = points
            }
            
            private   getRandom(min:number,max:number):number{
                let rand = Math.floor(min + Math.random() * (max + 1 - min)) ;
                return rand;
            }

            letsFight(){
            console.log("% for doublehit(must be >=90%)");
             while(this.player1.health > 0 && this.player2.health > 0){
               let  indexForP1:number    = this.getRandom(0,this.points.length-1);
               let  indexForP2:number    = this.getRandom(0,this.points.length-1);
             
               let percentForP1:number   = this.getRandom(0,100);
               let percentForP2:number   = this.getRandom(0,100);

          if ((this.player1 as ImproveFighter).doubleHit && (percentForP1 >= 90 && percentForP1 <= 100)){
                (this.player1 as ImproveFighter).doubleHit(this.player2,this.points[indexForP1]);
                console.log(`${this.player1.name} makes Double HIT!`);
            }else{
                this.player1.hit(this.player2,this.points[indexForP1]);
            }

            if((this.player2 as ImproveFighter).doubleHit && (percentForP2 >= 90 && percentForP2 <= 100)){
                (this.player2 as ImproveFighter).doubleHit(this.player1,this.points[indexForP2]);
                 console.log(`${this.player2.name} makes Double HIT!`);
            } else {
                this.player2.hit(this.player1,this.points[indexForP2]);
            }
       }
         

          

            if(!(this.player1.health > 0)){
                
                     console.log(`${this.player2.name} wins`) 
            }
            if (!(this.player2.health > 0)){
                    
                      console.log(`${this.player1.name} wins`)
                }
            }
            
        


       }
         

     let newFight =  new fight(new Fighter("rabbit"),new ImproveFighter("horse"),10,13,15)
     newFight.letsFight()

      }