<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title>Escape Input  </title>
<style type="text/css">
h1{ font-size:24px; font-weight:bold; color:rgb(50,50,250);} 
h2{ font-size:18px; font-weight:bold; color:rgb(250,50,150);}
h3{ font-size:14px; font-weight:bold; color:rgb(200,20,20);}
code, pre{ color:rgb(20,150,30); font-weight:bold; background:rgb(235,245,255); padding:10px;}

.nota{ color:rgb(250,120,0);}
.grigio{color:gray;}
.azzurro{color:rgb(100,150,255);}
.rosso{color:red;}
.scuro{color:#333;}
tt, em{color:#6a9999}
.codice{ color:rgb(30,120,30);}		
dt{ color:#003399; margin-bottom:5px;}
dd{ color:#0066FF;}

#infoErrore, #mailErrore, #passErrore,  #messaggioErrore{
color:red;	display:none;		opacity:0;
}

</style>
<!--
<script type="text/javascript" src="../allegati/ConvalidaForm.js"> </script>
-->
<script type="text/javascript" src="../allegati/ConvalidaForm.js"> </script>

</head>
<body>

<h1>Escape input</h1>

<p class='nota'>
Il form seguente è sottoposto alla convalida da alcune funzioni poste nel file <b>ConvalidaForm.js</b>. Quest'ultimo comprende anche una funzione di <em>escape</em> che è richiamata da tutte le altre funzioni preposte alla convalida dei campi. 

</p>

<form id="form_commenti">

	<label>Inserisci un nome</label>
	<input type="text"  name="nome" id="nome" size="50" maxlength="50" />	<span id="infoErrore">errore</span>	
			<br />
	<label>Inserisci una mail</label>
	<input type="text"  name="mail" id="mail" size="50" maxlength="50" />	<span id="mailErrore">errore</span>
			<br />
	<label>Inserisci una pass</label>
	<input type="password"  name="pass" id="pass" size="20" maxlength="20" />	<span id="passErrore">errore</span>
			<br />
	<label>Inserisci un Messaggio </label>
	<textarea id="messaggio" name="messaggio" ></textarea>		<span id="messaggioErrore"></span>			
			<br />
			
	<input type="submit" name="sub" value="Invia"/>						
</form>

<div id="divo"></div> 



<?php
/*
if( isset($_GET['sub']) ){
	$nome = $_GET['nome'];
	printf('%s', $nome);
}	
*/
?>



<script type="text/javascript">

var boxForm = document.getElementById('form_commenti');
var nome = document.getElementById('nome');
var email = document.getElementById('mail');
var pass = document.getElementById('pass');
var messaggio = document.getElementById('messaggio'); 

var divo = document.getElementById('divo');

messaggio.addEventListener('blur', 
function (){
//	validateMessage(messaggio);
//	validateMessage(messaggio,10);
	validateMessage(messaggio, 10, '#messaggioErrore');
}, false);


pass.addEventListener('blur', 
function (){
//	validatePass(pass);
//	validatePass(pass, null, 3);
	validatePass(pass, '#passErrore', 3);
}, false);


mail.addEventListener('blur', 
function (){
//	validateEmail(email);
	validateEmail(email, '#mailErrore');
},false);

nome.addEventListener('blur', 
function (){
	validateInput(nome, 5, '#infoErrore');
//	var testoNome = nome.value;
//	divo.firstChild.nodeValue(testoNome);
//	divo.innerHTML = 'fuk';
}, false);


// Convalida invio form 
boxForm.addEventListener('submit',
function (event){
	if( validateInput(nome, 5, '#infoErrore') && validateEmail(email, '#mailErrore') && validatePass(pass, '#passErrore', 3) && validateMessage(messaggio, 10, '#messaggioErrore') ){
		alert("Tutto a posto");
//		divo.firstChild.nodeValue(nome.value);
		return true;
	}else{
		event.preventDefault();
		alert("Nada");
	}

},false);



/*
http://benvinegar.github.io/csp-talk-2013/#10
ConvalidaForm.min.js
mik@libero.it
*/

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/\//g, "&#x2F;")  
} // 




</script>
























</body>
</html>
