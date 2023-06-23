var idImg = "";
var imgAbierta = "";
var count = 0;
var found =  0;
var timerId = 0;

function contadorTiempo()
{
	var timer = $("#timer").html();//variable igual a lo que esta en el HTML de @timmer
	timer++;//Arrancamos a contar uno por eso ponemos ++
	$("#timer").html("" + timer);//seleccionamos el @timer y añadimos un campo html "espacio"
	if (found<6) //mientras found (cartas econtradas) sean menor que 2, entonces ...
	{
		timerId = setTimeout('contadorTiempo()', 1000); //ejecuta el contado
	}
  else{
    alert('has ganado');// muestra que has ganado porque la variable 2 (2 grupos de parejas de cartas) han llegado al limite, osease 4 en este caso
  }
}

function randomizar(de, hasta){
    return Math.floor(Math.random() * (hasta - de + 1) + de);
}

function mezclar() {
    var imagenes = $("#imagenes").children(); //variable: almacena el div imagenes, utilzo .children() porque asi coge lo que está dentro del div #imagenes
    var imagen = $("#imagenes div:first-child");//Almacerna el primer hijo del elementos #imagenes, esta varaiable solo afecta en esta funcion, pues que no es global

    var array_img = new Array(); //variable: Nuevo array llamado imagen

    for (i=0; i<imagenes.length; i++) { //para i=0 , cuando i sea menor que el tamñao de elementos almacenadas en imagenes, y sumando cada vez
        array_img[i] = $("#"+imagen.attr("id")+" img").attr("src");// los amaceno en un array [i] y les asigno que: todos los elemnenos con el artribtuo ID que img + un atributo se alamacenan ahi
        imagen = imagen.next();//salta a la siguiente//preguntar a Manz
    }

    var imagen = $("#imagenes div:first-child"); // la variable imagen descalarad nuevamente, se le asigna el primer hijo del #Div Imagenes dID //GLOBAL

    for (z=0; z<imagenes.length; z++) { //para z y mientras z sea menor que el tamaño de imagenes
        randIndex = randomizar(0, array_img.length - 1); //declaro que la variable  randIndex es igual a una varible que se llama randomizar del array_img que es donde estan las imagenes guardadas por cantidad de las que hay, tamaño restandole 1//no lo entiendo

       
        $("#"+imagen.attr("id")+" img").attr("src", array_img[randIndex]); //del documento los ID y su coentido que consta del ID + una palarba seguida de img.........bo se porque usa serv
        array_img.splice(randIndex, 1); //añade al array_img lo que hay en ran index

        imagen = imagen.next(); //salta a a la imagen siguiente
    }
}

$(document).ready(function() { //cuando el documento esté abierto
    $("img").hide(); //los img los escondes
    $("#imagenes div").click(abrirImagen);//y a los elementos de div imagenes,cuando hacemos click, ejecutas la funcion abrirImagen

    mezclar(); //llamamos a la funcion mezclar para que se mezclen 
    contadorTiempo();//llamamos a la variable del tempo

    function abrirImagen() { //esta es l a funcion imagen que inicializa al hacer clien en los div que estan dentro de #imagenes

        id = $(this).attr("id");//...... declara que id, se le añade un atributo de id para nombrarlo mas abajo 

        if ($("#"+id+" img").is(":hidden")) { //ocultar os ID img
            $("#imagenes div").unbind("click", abrirImagen); // utilizan unbind para añadir un evento y un manejador de eventos

            $("#"+id+" img").slideDown('fast');

            if (imgAbierta == "") {
                idImg = id;
                imgAbierta = $("#"+id+" img").attr("src");
                setTimeout(function() {
                    $("#imagenes div").bind("click", abrirImagen)
                }, 300);
            } else {
                actual = $("#"+id+" img").attr("src");
                if (imgAbierta != actual) {
                    // Cerrar abiertas
                    setTimeout(function() {
                        $("#"+id+" img").slideUp('fast');
                        $("#"+idImg+" img").slideUp('fast');
                        idImg = "";
                        imgAbierta = "";
                    }, 400);
                } else {
                    // Coinciden!!
                    $("#"+id+" img").addClass("opacity");
                    $("#"+idImg+" img").addClass("opacity");
                    found++;
                    idImg = "";
                    imgAbierta = "";
                }

                setTimeout(function() {
                    $("#imagenes div").bind("click", abrirImagen)
                }, 400);
            }

            count++;
            $("#contador").html("" + count);

          
        }
    }
});


function reiniciarJuego() {
    mezclar();
    $("img").hide();
    $("img").removeClass("opacity");
    count = 0;
    $("#msg1").remove();
    $("#msg2").remove();
    $("#contador").html("" + count);
    idImg = "";
    imgAbierta = "";
    found = 0;
    $("#timer").html("0");
    clearTimeout(timerId);
    contadorTiempo();
    return false;
}
