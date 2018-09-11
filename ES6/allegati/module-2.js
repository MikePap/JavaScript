export default function(x, y) {
	return x * y;
}

/*
- In questo caso, usando il metodo 'default', si può esportare sono una funzione (o una sola proprietà)
- Nel richiamarla gli si può impostare un nome diverso, per esempio volendola importare da un'altro file:

	import moltiplicazione from 'directory-questo-file';	
	console.log(moltiplicazione(5, 4));
 

// alla funzione gli si è dato il nome 'moltiplicazione'


*/

