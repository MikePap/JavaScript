<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title> Stampa risultati Tennis  </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style type="text/css">

.rosso{
color:red;
}

</style>
</head>
<body>

</body>
</html>

<!--
http://localhost/JavaScript/Miei/risultati_tennis-game.php
-->

<h1>Risultati Tennis </h1>

<?php

if(isset($_POST['name1']) && isset($_POST['name2']) ){
	$giocatore1 = $_POST['name1'];
	$giocatore2 = $_POST['name2'];
//	echo "$nome $cognome"; 
//	echo "fuck";

	$nomefile = "partita.txt";            		    // creazione del file
//	$contenuto= "Questo è un file di ptova";  	//  contenuto da scrivere
	$contenuto = "Partita: " .$giocatore1. " - " .$giocatore2;
	$contenuto .= "\r\n";
	$fp = fopen($nomefile, "a");               // apertura del file con il parametro "w" che permette la scrittura
//	$fp = fopen("fileprova.txt", "r");
	$fw = fwrite($fp, $contenuto);              // inserimento del contenuto
//	$leggi = fread($fp, filesize($nomefile)); 
//	echo $leggi;

	fclose($fp);                               // chiusura del file aperto con open
}	


if(isset($_POST['player']) && isset($_POST['s']) && isset($_POST['g']) && isset($_POST['p'])	){
	$giocatore = $_POST['player'];
	$set = $_POST['s'];
	$game = $_POST['g'];
	$punteggio = $_POST['p'];
	$nomefile = "partita.txt";            		    // creazione del file
	$contenuto = $giocatore. " => " .$set. " - " .$game. " - " . $punteggio;
	$contenuto .= "\r\n";
	$fp = fopen($nomefile, "a");               // apertura del file con il parametro "w" che permette la scrittura
	$fw = fwrite($fp, $contenuto);              // inserimento del contenuto
	fclose($fp);
}


if(isset($_POST['player1']) && isset($_POST['player2']) && isset($_POST['valgioco1']) && isset($_POST['valgioco2'])	){
//if(isset($_POST['player1']) && isset($_POST['player2'])	){
	$giocatore1 = $_POST['player1'];
	$giocatore2 = $_POST['player2'];
	$game1 = $_POST['valgioco1'];
	$game2 = $_POST['valgioco2'];
	$nomefile = "partita.txt";      
	$contenuto = "Finale Set => " .$giocatore1. ": " .$game1. " - " .$giocatore2. ": " .$game2;
	$contenuto .= "\r\n";
	$fp = fopen($nomefile, "a");               // apertura del file con il parametro "w" che permette la scrittura
	$fw = fwrite($fp, $contenuto);              // inserimento del contenuto
	fclose($fp);
}


//### La seguente variabile arriva da "InserimentoDatiHTML.html" ###
if(isset($_POST['testo']) ){
	$testo = $_POST['testo'];

	$nomefile = "resultDatiHTML.html";
	$contenuto = "<b>Dato:</b> <span class='nota'>" .$testo. "</span><br>";
	$contenuto .= "\r\n";
	$fp = fopen($nomefile, "a");               // 
	$fw = fwrite($fp, $contenuto);              // inserimento del contenuto
	fclose($fp);

}



$statistiche = stat("resultDatiHTML.html");
echo $statistiche[7];									// bytes del file 

echo "<br> <br>";

echo filesize ("resultDatiHTML.html");				// bytes del file (uguale al precedente)




?>







