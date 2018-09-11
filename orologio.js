// Refer to "Orologio.html" che sta nella cartella "Javascript" 
/*
// Questa funzione a differenza della successiva applica il discorso del PM e AM perciò quando si superano le ore 12 scatta il PM e la numerazione delle ore riprende da 0 invece di proseguire con 13

function gettime() {
    var date= new Date();
    var hr = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ampm="AM";
    if (hr > 11){
        ampm="PM"
    }
    if (hr > 12){
        hr -= 12
    }
    if(m < 10){
        m = "0" + m
    }
    if(s < 10){
        s = "0" + s
    }
    document.clockform.clock.value = hr + ":" + m + ":" + s + " " +ampm;
    setTimeout("gettime()",100)
}
*/

function gettime() {
    var date= new Date();
    var hr = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (hr > 24){
        hr -= 24
    }
    if(m < 10){
        m = "0" + m
    }
    if(s < 10){
        s = "0" + s
    }
    document.clockform.clock.value = hr + ":" + m + ":" + s ;
    setTimeout("gettime()",100)
}



