// refere to script_js-esterno.html

function loadDoc(dname,elem)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
//			return xhttp.responseText;
			document.getElementById(elem).innerHTML=xhttp.responseText;
		}
	}
	xhttp.open("POST",dname,true);
//	xhttp.open("GET",dname,true);						// OK 

	xhttp.send();
} 


