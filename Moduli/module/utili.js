// Questo file l'ho creato per incorporare delle funzioni a seconda della esigenza del documento richiedente
// Le funzioni sono richiamate dai file presenti in questa cartella
// Ciò a dire che le funzioni inserite qui possono cambiare di volta in volta
// A titolo di esempio ho richiamato alcune che ritengo più comuni e richiesti


import nuovoElemento from "./creaNodi.js";				// caricamento di un'altro modulo  

import { $, ciclo } from "./tips.js";

import { eliminaNodiInterni, eliminaNodoBox } from "./eliminaNodi.js";

import adProp from './adPropOggetto.js';

import { nodiLiberi, nodiFigli } from './eventiNodo.js';

import stileElemento from './rilevaStile.js';

export { nuovoElemento, $, ciclo, eliminaNodiInterni, eliminaNodoBox, adProp, nodiLiberi, nodiFigli, stileElemento }



