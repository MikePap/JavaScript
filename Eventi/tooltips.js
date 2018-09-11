var Tooltips =
{
  init: function()
  {
    var links = document.getElementsByTagName("a");
    
    for (var i = 0; i < links.length; i++)
    {
      var title = links[i].getAttribute("title");
      
      if (title && title.length > 0)
      {
        Core.addEventListener(links[i], "mouseover", Tooltips.showTipListener);
        Core.addEventListener(links[i], "focus", Tooltips.showTipListener);
        Core.addEventListener(links[i], "mouseout", Tooltips.hideTipListener);
        Core.addEventListener(links[i], "blur", Tooltips.hideTipListener);
      }
    }
  },

// funzione che visualizzer� il suggerimento
  showTip: function(link)
  {
    Tooltips.hideTip(link);
// per visualizzare un suggerimento nella pagina si deve aggiungere al link in questione un elemento "span" che contiene il testo del suggerimento 
    var tip = document.createElement("span"); // "createElement" serve a creare l'elemento span che conterr� il suggerimento(tip)
    tip.className = "tooltip";  // qui si definisce la clase "tooltip" per l'elemento span 
    var tipText = document.createTextNode(link.title); // "document.createTextNode" serve a creare un nodo testuale e quindi si passa a questo metodo il testo che dovr� essere contenuto nel nodo con la propriet� title del link 
    tip.appendChild(tipText); // per inserire il nuovo nodo testuale all'interno del nuovo span occorre utilizare il metodo "appendChild" di span
    link.appendChild(tip); // qui "appendChild" viene utilizzato di nuovo per inserire lo span(figlio) al link(genitore)
    
    link._tooltip = tip;// qui si crea un riferimento al suggerimento con "_tooltip". Il segno di "_" prima della propriet� indica che si tratta di una propriet� privata che vuol dire che non dovrebbe essere utilizzata da altri script. Evita che altri script possano accedervi. Questo meccanismo aiuter� hideTip a verificare se esiste il suggerimento prima di eliminarlo.  
    link.title = "";  // qui si imposta la propriet� title del link con una stringa vuota in modo che il documento non contenga per due volte il testo del suggerimento  
    
    // Fix for Safari2/Opera9 repaint issue
    document.documentElement.style.position = "relative";
  },
// funzione che elimina la visualizzazione del suggerimento   
  hideTip: function(link)
  {
    if (link._tooltip) // qui si accerta se il suggerimento esiste(suggerimento creato alla riga 32) prima di eliminarlo
    {
      link.title = link._tooltip.childNodes[0].nodeValue; // grazie alla propriet� "nodeValue" si preleva il testo del suggerimento e lo si memorizza nella propriet� title. Poich� il nodo testuale � il primo figlio di tooltip � possibile accedervi come link._tooltip.childNodes[0].nodeValue     
      link.removeChild(link._tooltip);  // solo ora si pu� rimuovere il suggerimento utilizzando il metodo "remoceChild"
      link._tooltip = null; // _tooltip viene impostato a NULL per indicare che non vi � pi� un suggerimento visulalizzato
      
      // Fix for Safari2/Opera9 repaint issue
      document.documentElement.style.position = "static";
    }
  },

  showTipListener: function(event)
  {
    Tooltips.showTip(this);
    Core.preventDefault(event);
  },
  
  hideTipListener: function(event)
  {
    Tooltips.hideTip(this);
  }
};

Core.start(Tooltips);






