function turns(this_turn) {
  console.log(this_turn);
}
function randomCards(){

    var array = new Array();
    var random;
    var repite = true;

    random = Math.floor(Math.random() * Math.floor(7)) +1;
    array[0]= random;

    for (var iComidas=1; iComidas<4 ; iComidas++){

      while(repite){
        random = Math.floor(Math.random() * Math.floor(7)) +1;
        repite=false;
        for (var iArray=0; iArray<iComidas ; iArray++){
          if(array[iArray] == random){
              repite=true;
          }
        }
      }

      array[iComidas]= random;
      repite= true;
    }

    return array;
  }//fin comidas
