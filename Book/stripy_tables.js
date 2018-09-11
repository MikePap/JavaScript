var StripyTables =
{
  init: function()
  {
    var tables = Core.getElementsByClass("dataTable"); // ricerca solo le tabelle che hanno come classe "dataTable"

    for (var i = 0; i < tables.length; i++)
    {
      var tbodys = tables[i].getElementsByTagName("tbody"); // si intende elaborare solo gli elementi del tag "tbody", questo per escludere la riga "thead" 
      
      for (var j = 0; j < tbodys.length; j++)
      {
        var rows = tbodys[j].getElementsByTagName("tr");  // si ricercano gli elementi del tag "tr" riferito al tag "tbody"(vedi sopra)

        for (var k = 1; k < rows.length; k += 2) // si esegue questo ciclo su tutte le righe ma con un incremento di 2 unit� in modo da avere l'effetto su una riga si ed una no. La variabile "k" parte da 1 cio� il secondo indice (la seconda riga, mentre la prima corrisponde a "thead") 
        {
          Core.addClass(rows[k], "alt");  // quindi a rows[k] (cio� alle righe del ciclo che si incrementa di 2 unit�) viene aggiunta la classe "alt"
        } // 3� for
      } // 2� for
    } // 1� for
  } // chiude init
};

Core.start(StripyTables);



