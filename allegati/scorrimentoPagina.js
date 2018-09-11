/* refer to "Scroll_documento.html" 
*** LA SEGUENTE FUNZIONE VA INVOCATA:
var obj = new ScrollPage('1000', 100, 'freccia_sali', 300);
obj.showFreccia();
obj.clickScroll();

- OPPURE	COL METODO 'call()':
var obj = {};
ScrollPage.call(obj, 1000, 100, 'freccia_sali', 300);
obj.showFreccia();
obj.clickScroll();
*/

var ScrollPage = function (tempoScroll, frame, freccia, valShowFreccia){

	this.tempo = tempoScroll;							// tempo max di scorrimento
	this.frame = frame;									// i frame (interruzioni) 										
	this.freccia = freccia;								// la freccia nera 
	this.mostra = valShowFreccia;						// valore oltre il quale viene visualizzata la freccia nera	

	var sto = this;

	this.rp = function (){
		return	this.tempo / this.frame;	
	}	

	this.getScrollTop = function (){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}

	this.clickScroll = function (){
		var frecciaNera = document.getElementById(this.freccia);
		Core.addEventListener(frecciaNera, 'click', sto.vaiSu );
	}

	this.vaiSu = function (){
		if(sto.getScrollTop() <= sto.rp() ){ 
			window.pageYOffset = 0;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}
		if(sto.getScrollTop() === 0){ return;}
		valScorrimentoX = sto.getScrollTop() - ( sto.getScrollTop() / sto.rp()); 
		window.pageYOffset = valScorrimentoX;
		document.documentElement.scrollTop = valScorrimentoX;
		document.body.scrollTop = valScorrimentoX;
		setTimeout(sto.vaiSu, sto.rp());
	}

	this.showFreccia = function (){
		var frecciaNera = document.getElementById(this.freccia);		
		Core.addEventListener(window, 'scroll', 
			function (){
				if(sto.getScrollTop() > sto.mostra)
					frecciaNera.style.display = "block";
				else

					frecciaNera.style.display = "none";
			}
		);	
	}
}; // "ScrollPage"

///////////////////////////////////////////////////////////////////////////////////////////////////////

//##### La classe seguente ha le proprietà impostate al suo interno #####
var Scorrimento = {

	tempoScroll:		1000,										// tempo max di scorrimento 
	frame:				100,										//
	freccia:				'freccia_sali',						// la freccia nera 
	valShowFreccia:	300,										// valore oltre il quale viene visualizzata la freccia nera	

	rp: function (){
		return Scorrimento.tempoScroll / Scorrimento.frame;
	},

	getScrollTop: function (){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	},

	clickScroll: function (){
		var frecciaNera = document.getElementById(Scorrimento.freccia);
		Core.addEventListener(frecciaNera, 'click', Scorrimento.vaiSu );	
	},

	vaiSu: function (){
		if(Scorrimento.getScrollTop() <= Scorrimento.rp() ){ 
			window.pageYOffset = 0;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}
		if(Scorrimento.getScrollTop() == 0){ return;}
//		valScorrimentoX = Scorrimento.getScrollTop() - (parseInt(Scorrimento.getScrollTop() / Scorrimento.rp())); 
		valScorrimentoX = Scorrimento.getScrollTop() - ( Scorrimento.getScrollTop() / Scorrimento.rp()); 
		window.pageYOffset = valScorrimentoX;
		document.documentElement.scrollTop = valScorrimentoX;
		document.body.scrollTop = valScorrimentoX;
		Scorrimento.scrollo = setTimeout(Scorrimento.vaiSu, Scorrimento.rp() );
	},

//### Funzione per una eventuale visualizzazione della freccia nera dopo un dato valore di 'scroll' ###
	showFreccia: function (){
		var frecciaNera = document.getElementById(Scorrimento.freccia);		
		Core.addEventListener(window, 'scroll', 
			function (){
				var valore = Scorrimento.getScrollTop();
				if(valore > Scorrimento.valShowFreccia)
					frecciaNera.style.display = "block";
				else
					frecciaNera.style.display = "none";
			}
		);	
	} 

} //### "Scorrimento" ###

