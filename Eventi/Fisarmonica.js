// script per elenco a fisarmonica


var Accordion =
{
  init: function()
  {
    var accordions = Core.getElementsByClass("accordion"); // si recuperano gli elementi con classe "accordion" 

    for (var i = 0; i < accordions.length; i++) // 
    {
      var folds = accordions[i].childNodes; // per ogni elemento(piega) si recupera l'elenco dei nodi figli (childNodes )
      for (var j = 0; j < folds.length; j++) // 
      {
        if (folds[j].nodeType == 1) // si verifica che ciascun nodo dell'elenco sia proprio un nodo elemento
        {
          Accordion.collapse(folds[j]); // si richiama il metodo collapse che rimuove la classe "expanded" ed aggiungendo la classe "collapse" contrae la piega 
          var foldLinks = folds[j].getElementsByTagName("a"); // si richiama i riferimenti al tag "a"
          var foldTitleLink = foldLinks[0]; // si recuperano il primo link della piega 
          Core.addEventListener(foldTitleLink, "click", Accordion.clickListener); // si aggiunge un listener per eventi che risponderà al click degli utenti 
          
          for (var k = 1; k < foldLinks.length; k++)
          {
            Core.addEventListener(foldLinks[k], "focus", Accordion.focusListener); // si aggiunge un listener per l'evento focus ad ogni elemento link che potrebbe avere il focus tramite tastiera
          }
        }
      }
 // nel caso che un link di un altra pagina punti ad una  piega in particolare (es: <a href=accordion.html#pike">) sarebbe utile espanderla automaticamente nel momento in cui viene caricata la pagina, per cui ...     
      if (location.hash.length > 1)
      {
        var activeFold = document.getElementById(location.hash.substring(1)); // "location" è un oggetto che contiene informazioni relative all'indirizzo URL. La sua proprietà "hash" contiene la porzione dell'indirizzo URL che identifica il frammento(per esempio l'ID: #pike). Il metodo "substring" serve ad estrarre la porzione di frammento; per  escludere la "#"  "substring" diventa "substring(1)" (riferimento alla seconda parola)   
        if (activeFold && activeFold.parentNode == accordions[i]) // qui si attua il controllo per verificare che l'ID corrisponda ad un elemento della pagina
        {
          Accordion.expand(activeFold);
        }
      }
    }
  },

  collapse: function(fold)
  {
    Core.removeClass(fold, "expanded");
    Core.addClass(fold, "collapsed");
  },

// funzione per contrarre tutte le pieghe della pagina 
  collapseAll: function(accordion)  // "accordion" è un riferimento all'elemento a fisarmonica che si vuole contrarre   
  {
    var folds = accordion.childNodes; // con "accordion.childNodes" si ottiene il figlio dell'elemento  
    for (var i = 0; i < folds.length; i++) // qui si ottengono tutti i figli dell'elemento (gli elementi "li" che rappresentano le pieghe)
    {
      if (folds[i].nodeType == 1) // è un controllo per verificare l'esistenza dei nodi. Non c'è garanzia che tutti i nodi figli dell'elenco siano  effettivamente nodi di elementi (ovvero elementi dell'elenco). La proprietà "nodeType" di un nodo dice che si ha a che fare con nodi per elementi, nodi testuali o nodi di attributi. E dato  che noi siamo interessati ai nodi di elementi dobbiamo verificarlo("folds" si riferisce a i figli di "accordion" che è un nodo elemento) 
      {
        Accordion.collapse(folds[i]); // qui si richiama il metodo "collapse" che serve a contrarre le pieghe e si affida appunto "folds" (tutti i folds[i])
      }
    }
  },

  expand: function(fold)
  {
    Accordion.collapseAll(fold.parentNode);
    Core.removeClass(fold, "collapsed");
    Core.addClass(fold, "expanded");
  },
  
  clickListener: function(event)
  {
    var fold = this.parentNode.parentNode; // la piega è in questo caso il nodo genitore del nodo genitore (nonno) del link all'interno della piega.
    if (Core.hasClass(fold, "collapsed"))  // verifica se la piega è contratta ...
    {
      Accordion.expand(fold);  // in tal caso la espande 
    }
    else // se invece non è contratta vuol dire che è espansa quindi ....
    {
      Accordion.collapse(fold); // la contrae
    }
    Core.preventDefault(event); // qui si evita che il browser tenti di seguire il link. 
  },
  
  focusListener: function(event) // funzione per aggiungere un listener  per evento focus da tastiera 
  {
    var element = this; // "this" è un elemento in qualche piega del controllo a fisarmonica 
    while (element.parentNode)// si utilizza un ciclo while per risalire i nodi genitore 
    {
      if (element.parentNode.className == "accordion") // se il nodo genitore è un elemento con classe "accordion", cioè che si trova nella piega ...
      {
        Accordion.expand(element); // allora lo si espande
        return;
      }
      element = element.parentNode;
    }
  }
};

Core.start(Accordion);







