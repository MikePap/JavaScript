// JavaScript Document


/* funzione di gestore eventi che FA APRIRE UNA NUOVA FINESTRA O UNA NUOVA SCHEDA DELLA FINESTRA 
 DA APPLICARSI SU UN LINK AVENTE LA CLASSE="ESTERNO" 
*/
var link_esterno = {

init: function() {

var ext_link = Core.getElementsByClass("esterno");
for(var i=0; i < ext_link.length; i++) {
ext_link[i].onclick = link_esterno.clickHandler;
   } // chiude for  
 }, // chiude init
clickHandler: function()
{ open(this.href); 
   return false; }

}; // chiude link_esterno
Core.start(link_esterno);













