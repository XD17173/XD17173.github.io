let body = document.querySelector('body');
let effect = 1;

body.addEventListener('click',function(){
	effect++;
  if (effect >= 9) { effect = 1; }
	this.className = "effect" + effect;
});