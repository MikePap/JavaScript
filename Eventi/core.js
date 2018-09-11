var Core = {};

// W3C DOM 2 Events model
if (document.addEventListener) {
 Core.addEventListener = function(target, type, listener) {// l'oggetto "target" è normalmente un nodo per elementi del DOM.   
 target.addEventListener(type, listener, false); //all'oggetto "target" viene assegnata la funzione/metodo "listener" come listener per eventi di tipo "type" (click, submit, mouseover, ecc...) 
  };  // chiude la funzione    

  Core.removeEventListener = function(target, type, listener)// per l'oggetto "target" questa funzione rimuove la funzione precedentemente aggiunta come listener per eventi. 
  { target.removeEventListener(type, listener, false);
  }; // chiude la funzione

  Core.preventDefault = function(event) //metodo che impedisce al browser di eseguire l'azione predefinita associata all'evento rappresentato da "event"(oggetto evento passato come argomento al listener)
  { event.preventDefault();
  }; // chiude la funzione

  Core.stopPropagation = function(event) // metodo che impedisce ai listener associati a elementi di un livello superiore nell'albero del DOM di rispondere all'evento "event" (oggetto evento passato come argomento al listener)
  { event.stopPropagation();
  }; // chiude la funzione
} // chiude il codice(if) secondo il W3C DOM 2 Events model per tutti i browser, tranne che per IE

// Internet Explorer Events model
else if (document.attachEvent) {
 Core.addEventListener = function(target, type, listener) {// l'oggetto "target" è normalmente un nodo del DOM. 
    if (Core._findListener(target, type, listener) != -1) return; // evita di aggiungere due volte lo stesso listener 

    // listener2 calls listener as a method of target in one of two ways,
    // depending on what this version of IE supports, and passes it the global
    // event object as an argument
    var listener2 = function() { // listener2 richiama listener quale metodo di target in un paio di modi secondo la versione di IE e gli passa  event l'evento globale come argomento 
     var event = window.event;  // qui recupera l'oggetto global event

      if (Function.prototype.call)  { // qui si controlla con questa funzione se è disponibile il metodo "call" 
        listener.call(target, event); // si utilizza "call" per richiamare listener come metodo di target e utilizzando come argomento event
	}else{ // nelle versioni precedenti di IE 5.5 il metodo call non è disponibile e quindi si deve memorizzare listener in una proprietà chiamata "_currentListener" la quale consente di richiamare listener come metodo di target passando event come argomento 
        target._currentListener = listener;
        target._currentListener(event)
        target._currentListener = null;
      }
    }; // chiude la funzione
// ora che si ha listener2 lo utilizziamo nel metodo "attachEvent" 
    target.attachEvent("on" + type, listener2);
// occorre garantirsi che il metodo "_findListener" possa scoprire se questo listener(listener2) è stato registrato. Si crea quindi, per l'occasione, un oggetto contenente tutte le informazioni del listener.
    // create an object describing this listener so we can clean it up later
    var listenerRecord =
    {
      target: target,
      type: type,
      listener: listener,
      listener2: listener2
    };

    // get a reference to the window object containing target
    var targetDocument = target.document || target;
    var targetWindow = targetDocument.parentWindow;

    // create a unique ID for this listener
    var listenerId = "l" + Core._listenerCounter++;

    // store a record of this listener in the window object
    if (!targetWindow._allListeners) targetWindow._allListeners = {};
    targetWindow._allListeners[listenerId] = listenerRecord;

    // store this listener's ID in target
    if (!target._listeners) target._listeners = [];
    target._listeners[target._listeners.length] = listenerId;

    // set up Core._removeAllListeners to clean up all listeners on unload
    if (!targetWindow._unloadListenerAdded)
    {
      targetWindow._unloadListenerAdded = true;
      targetWindow.attachEvent("onunload", Core._removeAllListeners);
    }
  };

  Core.removeEventListener = function(target, type, listener) // per l'oggetto "target" questa funzione rimuove la funzione precedentemente aggiunta come listener per eventi.
  {
    // find out if the listener was actually added to target
    var listenerIndex = Core._findListener(target, type, listener);
    if (listenerIndex == -1) return;

    // get a reference to the window object containing target
    var targetDocument = target.document || target;
    var targetWindow = targetDocument.parentWindow;

    // obtain the record of the listener from the window object
    var listenerId = target._listeners[listenerIndex];
    var listenerRecord = targetWindow._allListeners[listenerId];

    // remove the listener, and remove its ID from target
    target.detachEvent("on" + type, listenerRecord.listener2);
    target._listeners.splice(listenerIndex, 1);

    // remove the record of the listener from the window object
    delete targetWindow._allListeners[listenerId];
  };

  Core.preventDefault = function(event) //metodo che impedisce al browser di eseguire l'azione predefinita associata all'evento rappresentato da "event"(oggetto evento passato come argomento al listener)
  { event.returnValue = false;
  }; // chiude la funzione

  Core.stopPropagation = function(event) // metodo che impedisce ai listener associati a elementi di un livello superiore nell'albero del DOM di rispondere all'evento "event" (oggetto evento passato come argomento al listener)
  { event.cancelBubble = true;
  }; // chiude la funzione

//
  Core._findListener = function(target, type, listener) {
    var listeners = target._listeners; // ottiene l'array di ID di listener aggiunti al target(oggetto)
    if (!listeners) return -1; // se trova un record che corrisponde al target, al type e al listener specificati restituisce l'indice dell'ID di tale listener nell'array _listener di target altrimenti restituisce -1.
    var targetDocument = target.document || target; // 
    var targetWindow = targetDocument.parentWindow; // ottiene un riferimento all'oggetto finestra contenente target (quindi sale alla sommità del DOM)

    // searching backward (to speed up onunload processing), find the listener
    for (var i = listeners.length - 1; i >= 0; i--) { // ricerca all'indietro. Dalla sommità ridiscende ...
      var listenerId = listeners[i]; //fino a trovare il listener da target 
      // get the record of the listener from the window object
      var listenerRecord = targetWindow._allListeners[listenerId]; //ottiene il record del listener dall'oggetto finestra

      // compare type and listener with the retrieved record
      if (listenerRecord.type == type && listenerRecord.listener == listener) {
        return i;
      } // chiude if
    } // chiude il for
    return -1;
  }; // chiude la funzione

  Core._removeAllListeners = function() {
    var targetWindow = this;
    for (id in targetWindow._allListeners) {
      var listenerRecord = targetWindow._allListeners[id];
      listenerRecord.target.detachEvent(
          "on" + listenerRecord.type, listenerRecord.listener2);
      delete targetWindow._allListeners[id];
    } // chiude il for
  }; // chiude la funzione

  Core._listenerCounter = 0;
}


   

// funzione per aggiungere una classe ad un elemento
Core.addClass = function(target, theClass)
{
  if (!Core.hasClass(target, theClass)) // controlla se c'è già una classe con tale nome con appunto la funzione preposta "Core.hasClass"
  {
    if (target.className == "")  // controlla se tale elemento contiene delle classi ...(se è vuoto non ne contiene)
    {
      target.className = theClass; // se non contiene classi allora si assegna theClass grazie alla proprietà className
    }
    else  // se invece l'elemento contiene già delle classi ...
    {
      target.className += " " + theClass;  // con questa espressione si aggiunge un'altra classe alle precedenti
    }
  }
};

// funzione che trova tutti gli elementi nel documento che appartengono alla stessa classe
Core.getElementsByClass = function(theClass)
{
  var elementArray = [];

  if (document.all)
  {
    elementArray = document.all;
  }
  else
  {
    elementArray = document.getElementsByTagName("*");
  }

  var matchedArray = [];
  var pattern = new RegExp("(^| )" + theClass + "( |$)"); // quetsta è un espressione regolare  che aiuta a ricercare le stringhe tramite determinati modelli o pattern

  for (var i = 0; i < elementArray.length; i++)
  {//si sarebbe potuto scrivere => if(elementArray[i] == the Class  se non fosse che un elemento può contenere più classi e quindi si usa l'espressione regolare
    if (pattern.test(elementArray[i].className)) // "test" controlla la classe(className) di tutti gli elementi del nodo per vedere se l'elemento in questione appartiene alla classe che si sta cercando
    {
      matchedArray[matchedArray.length] = elementArray[i];  // sfruttando la lunghezza dell'array(length) si conservano tutti gli elementi in un array. Elementi che avranno in comune la classe indicata come parametro nella funzione
    }
  } // chiude il ciclo for

  return matchedArray;
};

// funzione per determinare se ul elemento contiene una tale classe
Core.hasClass = function(target, theClass) // target=> elemento , theClass => la classe
{
  var pattern = new RegExp("(^| )" + theClass + "( |$)"); // quetsta è un espressione regolare  che aiuta a ricercare le stringhe tramite determinati modelli o pattern

  if (pattern.test(target.className)) // qui  si passa al metodo "test" la classe dell'elemento(target) con className
  {
    return true;  // se il metodo "test" restituisce "true" significa che l'elemento contiene la classe
  }

  return false;
};

// per eliminare una classe da un elemento 
Core.removeClass = function(target, theClass)  // target=> elemento , theClass => la classe 
{
  var pattern = new RegExp("(^| )" + theClass + "( |$)"); 

  target.className = target.className.replace(pattern, "$1"); // con il metodo "replace" si sostituisce la classe con uno spazio vuoto presupponendo che l'elemento possa contenere una classe
  target.className = target.className.replace(/ $/, ""); // qui si ripulisce className degli spazi vuoti in eccesso perchè alcuni browser dano problemi quando all'inizio di className ci sono degli spazi
};

Core.getComputedStyle = function(element, styleProperty)
{
  var computedStyle = null;

  if (typeof element.currentStyle != "undefined")
  {
    computedStyle = element.currentStyle;
  }
  else
  {
    computedStyle = document.defaultView.getComputedStyle(element, null);
  }

  return computedStyle[styleProperty];
};

Core.start = function(runnable)
{
  Core.addEventListener(window, "load", runnable.init);
};
