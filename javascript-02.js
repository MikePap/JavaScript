// JavaScript Document


/*
 ISTRUZIONE  typeof 

<p id="dati"> dati testo </p>

//var id = document.getElementById("dati"); // anche qiesta va bene 
var id = document.getElementById("p");      // è uguale alla precedente 
var dati = typeof("id");
alert(dati);

........................
ALTRO ESEMPIO

// questa è ancora più semplice
var mik= "mikrele";
var p= typeof(mik);
alert(p);


*/








/*
// PROPRIETA'  "parentNode"  (per individuare il nodo genitore)

<p> <a id="oliver" href="#"> OLiver </a></p>

var oliver = document.getElementBYId("oliver"); 
var paragrafo = oliver.parentNode;  // fa riferimento al paragrafo genitore (p) 

*/

/*

<ul id="baldwin">
    <li> Alec </li>
    <li> Daniel </li>
    <li> William </li>
    <li> Stephen </li>
</ul>    

//PROPPRIETA'  "childNodes" (per individuare i figli di un elemento)

var baldwinS = document.getElementById("baldwin"); 

var william = baldwinS.childNodes[2];  // accede al terzo elemento della lista  

PROPRIETA' "firstChild"  "lastChild" (per individuare il primo e l'ultimo figlio)

var alec = baldwinS.firstChild;        oppure =>  baldwinS.childNodes[0];
var stephen = baldwinS.lastChild;      oppure =>  baldwinS.childNodes[childNodes.length -1]

PROPRIETA'  "nextSibling"  "previousSibling"  (successivo e precedente)

var stephen = william.nextSibling;      si raggiunge il successivo che è Stephen partendo da la già dichiarata william
var daniel = william.previousSibling;   si raggiunge il precedente che è Daniel partendo da la già dichiarata william

// quando ci si trova all'ultimo nodo di un livello e si tente di utilizzare nextSibling la prprietà diviene NULL 
   analogamente quando si usa previousSibling  dal primo nodo

*/






























