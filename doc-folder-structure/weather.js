var slide = document.getElementById('slide');

slide.oninput = function(){
  clearAnimation();
  switch (this.value){
    case "1": happyWeather();
      break;
    case "2": mildWeather();
      break;
    case "3": stormyWeather();
      break;
    case "4": severeWeather();
      break;
  }
}

function applyAnimation(id, animation){
  var el = document.getElementById(id);  $(el).addClass(animation);
}

function clearAnimation(){
  el = document.getElementById("container");
  $(el).removeAttr( "class" );
}

function happyWeather(){
  applyAnimation("container", "no-fall");
}

function mildWeather(){
  applyAnimation("container", "mild-fall");
}

function stormyWeather(){
  applyAnimation("container", "stormy-fall");
}

function severeWeather(){
  applyAnimation("container", "severe-fall");
}
