


const shuffle = (max, min, num) => {
  var array = []; 
  var times = 0;
  if(num < (max + 1 - min)){

    times = 1;
  }
    else{
  times = Math.floor(num / (max-min));
}
  while(times != 0){
    for(var x = min; x < max+1; x++){
      array.push(x);
    }
    times--;
    console.log(times);
  }
  
  //Find out length
  //length is equal to

  //makes an array
  var i = array.length,
      j = 0,
      temp;

  while (i--) {

      j = Math.floor(Math.random() * (i+1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

  }

  return array.slice(0,num);
};
exports.shuffle = shuffle;