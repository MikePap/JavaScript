// JavaScript Document

/*
  x=1;
  alert('TESTA='+x);

  x++;
  alert('CORPO='+x);

  x++;
  alert('CORPO='+x);


//alert('Sono un file esterno')

/*
Potrebbero essere utilizzati anche browser non compatibili con Javascript oppure quelli in cui Javascript è disabilitato (è possibile con Netscape). In questo caso ci viene in aiuto il tag <NOSCRIPT></NOSCRIPT> che può contenere testo e grafica alternativi oppure un reindirizzamento in pagine statiche, che non adoperano Javascript, mediante la sequenza:

<noscript>
<meta http-equiv refresh content="0; url=altrapagina.htm">
</noscript> 
*/

/*
alert('Questo sito e \' in costruzione') // corretto
alert('Questo sito e ' in costruzione') // errato
*/



function nascondi() {  // funzione che applica lo "style visibility" ad un elemento dal suo id (div)	
  
  //document.all["mioLiv"].style.visibility="hidden";
  /*per Internet Explorer*/

  // document.layers["mioLiv"].visibility= "hide";
  /*per Netscape 4*/

  document.getElementById("mioLiv").style.visibility= "hidden";
  /*per IE 5/6 e NN 6*/
}


<!--
  alert("ciao");
//--> Per "nascondere" il codice JavaScript è orferibile usare  questa sintassi: 

/*
// ALERT da una sola possibilità di scegliere con "ok"
var messaggio = "Ecco il messaggio";
alert(messaggio);
*/

/*
// CONFIRM da 2 possibilità di scegliere fra "ok" e "annulla"
confirm("messaggio");

*/

/*


PROMPT è una finestra che pone una domanda e consente all'utente di dare la risposta che vuole. Può avere anche un valore di risposta predefinito.

prompt("domanda","risposta predefinita");

*/


/*
var mioNome; // "var" può essere omesso (tutta questa espressione può essere omessa)

mioNome="Wolfgang"; 
document.write(mioNome);

*/

/*

 nomeUtente=prompt("Scrivi il tuo nome","il tuo nome");
  document.write("Benvenuto ");
  document.write(nomeUtente);
oppure

document.write("Benvenuto "+nomeUtente+"!");

*/
/*

anno=2002;
scritta="Siamo nel ";
scrittaTotale= scritta+anno;
document.write(scrittaTotale); 

*/


function scriviRisoluzione(){
  document.write("Stai navigando a una risoluzione di "+screen.width+" x "+screen.height);
}

//scriviRisoluzione();



scritta2="ciao globale"; // variabile globale

function saluta() {
  // inizializzo le variabili all'interno delle funzioni
  var scritta2="ciao locale"; // variabile locale
}

// richiamo la funzione
saluta();

// faccio riferimento alla variabile
alert(scritta2);
// l'output sarà quello della variabile globale (quella fuori della funzione)



/*
valore = "lal";

if (isNaN(valore) ) {
 
// isNaN() vuol dire "not a number" e serve per verificare se il tipo di dati in esame è differente da un numero 
  alert(valore + " non è un numero!");
  
} else {

  if (valore >= 9) {
    alert(valore + " è maggiore o uguale a 9")
    
  } else {
    alert(valore + " è minore di 9")
  }
}

*/


/*

x = 8;

if (! (x == 7) ) {
  alert ("x non è 7");
}

è uguale alla precedente

x = 7;

if (x != 7) {
  alert ("x non è 7");
}


*/

function valida() { // funzione per la convalida di alcuni campi di un modulo (vedi form seccessivo)  NON FUNZIONA????
  //prendo i valori dei campi, abbreviandone i nomi
  eta=dati.eta.value;
  email=dati.email.value;

  if (isNaN(eta)){
    alert ("Inserisci un'età valida");
    return false;
  }

  if (email.indexOf("@")==-1) { 
//indexOf:  si utilizza per verificare se una determinata stringa contiene o meno un determinato testo (ovvero una determinata sottostringa).
    alert ("Inserisci un'email valida");
    return false;
  }
}

/*
FORM CREATO PER LA FUNZIONA DI CUI SOPRA  
<form name="dati" action="http://www.html.it" onSubmit="return valida();">
<!--notare il return anteposto alla chiamata della funzione-->

La tua età: <input type="text" name="eta"><br/>
La tua e-mail: <input type="text" name="email"><br/>

<input type="submit" value="invia">
</form> 

*/

// FUNZIONE CON CONFIRM

function conferma () {
  chiediConferma = confirm('Sei sicuro di voler uscire dalla pagina?');
  
  if (chiediConferma == true){
    location.href="http://www.oliolevante.it"; //ricarica la pagina
  }

// o anche nella forma più sintetica:

//  if (confirm('Sei sicuro di voler uscire dalla pagina?')){ 
//    location.href="#"; //ricarica la pagina
  }
  }

//fuori dallo <script> si richiama la funzione => <a href="#" onClick="conferma();"> testo link </a> 


// SCRIPT PER ADATTARE L'ALTEZZA DI UNA CELLA ALLA RISOLUZIONE DEL MONITOR
/*
<table border="1" cellspacing="0" cellpadding="0">
<tr>

<script type="text/javascript">
*/

if (screen.width==640) altezzaCella=80;
else if (screen.width==800) altezzaCella=100;
else if (screen.width==1024) altezzaCella=150;
else altezzaCella=200;

document.write("<TD height=""+altezzaCella+"">");
/*
</script>
<no script>
  <td width="100">
</no script>

prova</td>

<tr>
</table> 
*/

/*

UTILIZZO DELLO SWITCH ( stessa espresione della precedente)

switch (screen.width) {

  case 640:
    altezzaCella=80;
  break;

  case 800:
    altezzaCella=100;
  break;

  case 1024:
    altezzaCella=150;
  break;

  default:
   altezzaCella=200;
} 

*/

/*
// METODI DI ARRAY


var arrayb= ["uno", " diue", " tre"];
var totale= arrayb.length;
//alert(totale);
var ultimo= arrayb[arrayb.lenght -1];
//document.write(totale);
//document.write(arrayb);

alunni= new Array("Gianni", "Marco", "Franco");
//aggiungi=alunni.push("Davide");
//document.write(aggiungi);

//aggiungi=alunni.concat("Davide","Giovanni");
//document.write(aggiungi);

//togli=alunni.pop();
//document.write(togli);

elimina_inizio= alunni.shift();

document.write(elimina_inizio);


*/
 
 
 
/*

ARRAY ASSOCIATIVI 

var arrayAssociativo = { "Mario":"7", "Gianni":"4", "Monica":"4" };
//alert(arrayAssociativo["Mario"]);

//voti = new Array(); // oppure voti []
voti = [];
voti["Mario"] = 7; 
voti["Gianni"] = 4; 
voti["Monica"] = 4; 

alert(voti["Mario"]); 

*/



/*

ESEMPI  DI CICLO WHILE 


var numeri = [1, 2, 3, 4, 5];
var contatore = 0;
while (contatore < numeri.length) {
numeri[contatore];
numeri[contatore] *= 2 ;
contatore++;
}

//document.write(contatore);
document.write(numeri);
...................................................

ESEMPIO CON TABELLA

<script type="text/javascript">
  alunni =new Array("Aldo","Giovanni","Giacomo","Mario","Gianni","Monica");
  voti= new Array(3,8,5,7,4,4); // a ogni nome corrisponde un voto
</script> 


<table border="1">
<tr>
  <td><B>Voti</B></td>
  <td><B>Alunni</B></td>
</tr>

<script type="text/javascript">
 i=0;
 
 //inizio blocco di istruzioni
 while(i<alunni.length) {
  document.write("<tr>");

  //notare l'indice variabile
  document.write("<td>"+alunni[i]+"</td>");
  document.write("<td>"+voti[i]+"</td>");
  document.write("</tr>");

  //fine blocco di istruzioni

  i++; //aumento l'indice di 1
 }
</script>
</table>

*/

/*
ESEMPI CICLO DO WHILE 


ESEMPIO CON TABELLA

<script type="text/javascript">
  alunni =new Array("Aldo","Giovanni","Giacomo","Mario","Gianni","Monica");
  voti= new Array(3,8,5,7,4,4); // a ogni nome corrisponde un voto
</script>

<table border="1">
 <tr>
  <td><b>Voti</b></td>
  <td><b>Alunni</b></td>
 </tr>
 <script type="text/javascript">
  i = 0;
  do {
  
  //inizio blocco di istruzioni
  document.write("<tr>");
  document.write("<td>"+alunni[i]+"</td>");//notare l'indice variabile
  document.write("<td>"+voti[i]+"</td>");
  document.write("</tr>");

  //fine blocco di istruzioni
  i++; //aumento l'indice di 1
} while(i<alunni.length);
</script>
</table>

*/

/*
ESEMPI DI CICLO FOR 

var numeri = [1, 2, 3, 4, 5];

for(var i=0;  i < numeri.length;  i++) {
//(numeri)[i];
}
document.write(numeri)[i];

.........................................

ESEMPIO CON TABELLA 

<script type="text/javascript">
alunni =new Array("Aldo","Giovanni","Giacomo","Mario","Gianni","Monica");
voti= new Array(3,8,5,7,4,4); // a ogni nome corrisponde un voto
</script>

<table border="1">
<tr>
 <td><b>Voti</b></td>
 <td><b>Alunni</b></td>
</tr>
<script type="text/javascript">

for (i=0; i<alunni.length; i++) {
//inizio blocco di istruzioni

  document.write("<tr>");
  //notare l'indice variabile
  document.write("<td>"+alunni[i]+"</td>");
  document.write("<td>"+voti[i]+"</td>");
  document.write("</tr>");

//fine blocco di istruzioni
}
</script>
</table>

*/


/*

CICLO FOR...IN 

<script type="text/javascript">

alunni = new Array("Aldo","Giovanni","Giacomo","Mario","Gianni","Monica");

for (prop in alunni) {
document.write(alunni[prop]+"<br/>");}

</script>

*/












