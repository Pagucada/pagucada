$("#cartelFinal").css("opacity", "0");
$("#cartelFinal").slideUp(1);

let audioPuntuacionCero = new Audio("Audio/roblox-death-sound-effect.mp3");
audioPuntuacionCero.loop = false;
audioPuntuacionCero.play();
let audioBackgroundSound1 = new Audio("Audio/videoplayback.mp4");
audioBackgroundSound1.loop = false;
audioBackgroundSound1.play();
let audioBackgroundSound2 = new Audio("Audio/chega-de-saudade.mp3");
audioBackgroundSound2.loop = false;
audioBackgroundSound2.play();
let audioPuntuacionBuena = new Audio("Audio/ho-ho-ho.mp3");
audioPuntuacionBuena.loop = false;
audioPuntuacionBuena.play();

let backgroundSounds = [audioBackgroundSound1, audioBackgroundSound2]
function randomBackgroundNumber() {
  randomNumber = Math.floor(Math.random() * 99)
  if (randomNumber > 49) 
  {
    return 1
  } 
  else 
  {
    return 0
  }
}
cancionDeSesion = randomBackgroundNumber(); 

// debugger
let i = 1;
// Indice con el cual se definirá la id de cada 'div.casilla'
let probabilidadFrutaCheta = 9;
let puntuacion = 0;
let juego = "activo";
let tasaAparicionFruta = 2850;
let direccionSerpiente = "quieta";
let estadoDeJuego = "quieto";
let velocidadSerpiente = 50;
let contadorTiempo = 60;
// let coordenadasX = 220;
// let coordenadasY = 510;

// posicionSerpienteInicial es un número random que abarca desde el 1 hasta el 1601
$("#contadorTiempo").text(contadorTiempo);
$("#cartelFinal").css("opacity", "1");
let contadorTiempoAuxiliar = 0;
$(document).keydown(function(event) {
  if (
    event.which === 39 ||
    event.which === 40 ||
    event.which === 37 ||
    event.which === 38
  ) {
    backgroundSounds[cancionDeSesion].play();
    if (contadorTiempoAuxiliar === 0) {
      contadorTiempoAuxiliar++;
      intervaloContador = setInterval(() => {
        if (contadorTiempo != 0) {
          contadorTiempo--;
        } else if (contadorTiempo == 0) {
          backgroundSounds[cancionDeSesion].pause();
          contadorTiempo = -1;
          direccionSerpiente = "muerta";

          if (puntuacion < 100) {
            aviso = "Noob!";
          } else {
            audioPuntuacionBuena.play();
            aviso = "Terminaste!";
          }
          juego = "terminado";
          $("#cartelFinal").append(
            aviso + " <br> Tu puntuación fue: " + puntuacion
          );
          setTimeout(() => {
            $("#cartelFinal").slideDown();
          }, 150);
          clearInterval(intervaloContador);
        }
      }, 1000);
    }
  }
});
intervaloActualizarTiempoYPuntaje = setInterval(() => {
  $("#contadorTiempo").text(contadorTiempo);
  if (contadorTiempo <= 0 && puntuacion < 100) {
    setTimeout(() => {
      audioPuntuacionCero.play();
    }, 80);
    clearInterval(intervaloActualizarTiempoYPuntaje);
  }
  if (contadorTiempo <= 0) {
    direccionSerpiente = "quieta";
    clearInterval(intervaloActualizarTiempoYPuntaje);
  }
}, 1000);
let posicionSerpienteInicial = Math.floor(Math.random() * 1600) + 1;

function tieneNumero(array, numero) {
  for (let indice = 0; indice < array.length; indice++) {
    if (array[indice] === numero) {
      return true;
    }
  }
  return false;
}

function crearFruta(frutas) {
  // 3% de chance de que se ejecute este bloque de código y aparezca una frutaCheta en vez de una fruta común
  // La cual dará más puntos y tiempo extra de juego...
  if (Math.floor(Math.random() * 100) <= probabilidadFrutaCheta) {
    // Defino frutaNueva como un random entre 1 y 1600
    frutaNueva = Math.floor(Math.random() * 1600) + 1;
    // Filtro frutaNueva y vuelvo a llamar esta función hasta que frutaNueva sea diferente a todas las demás
    // Esto se hace para no poner mas de una fruta por casilla
    if (
      $("#" + frutaNueva).hasClass("fruta") ||
      $("#" + frutaNueva).hasClass("frutaCheta")
    ) {
      crearFruta(frutas);
    } else {
      // Si frutaNueva tiene un valor que no ha sido poblado por una fruta, se crea la fruta
      frutas.push(frutaNueva);
      $("#" + frutas[fruitIndex]).addClass("frutaCheta");
      $("#" + frutas[fruitIndex]).removeClass("casilla");
    }
  } else {
    // Defino frutaNueva como un random entre 1 y 1600
    frutaNueva = Math.floor(Math.random() * 1600) + 1;
    // Filtro frutaNueva y vuelvo a llamar esta función hasta que frutaNueva sea diferente a todas las demás
    // Esto se hace para no poner mas de una fruta por casilla
    if (
      $("#" + frutaNueva).hasClass("fruta") ||
      $("#" + frutaNueva).hasClass("frutaCheta")
    ) {
      crearFruta(frutas);
    } else {
      frutas.push(frutaNueva);
      $("#" + frutas[fruitIndex]).addClass("fruta");
      $("#" + frutas[fruitIndex]).removeClass("casilla");
    }
  }
}

// Se crea el tablero
for (columna = 0; columna < 40; columna++) {
  if (i === posicionSerpienteInicial) {
    $("#tablero").append("<div class='casilla serpienteAb' id='" + i + "'>");
    if (i === 1) {
      $("#" + i).css("border-top-left-radius", "10px");
    } else if (i === 1561) {
      $("#" + i).css("border-bottom-left-radius", "10px");
    }
    i++;
  } else {
    $("#tablero").append("<div class='casilla' id='" + i + "'>");
    if (i === 1) {
      $("#" + i).css("border-top-left-radius", "10px");
    } else if (i === 1561) {
      $("#" + i).css("border-bottom-left-radius", "10px");
    }
    i++;
  }

  for (filas = 0; filas < 39; filas++) {
    if (i === posicionSerpienteInicial) {
      $("#tablero").append("<div class='casilla serpienteAb' id='" + i + "'>");
      if (i === 40) {
        $("#" + i).css("border-top-right-radius", "10px");
      } else if (i === 1600) {
        $("#" + i).css("border-bottom-right-radius", "10px");
      }
      i++;
    } else {
      $("#tablero").append("<div class='casilla' id='" + i + "'>");
      if (i === 40) {
        $("#" + i).css("border-top-right-radius", "10px");
      } else if (i === 1600) {
        $("#" + i).css("border-bottom-right-radius", "10px");
      }
      i++;
    }
  }
}
// Se construye el tablero de 40x40 casillas
// Se define posicionSerpienteInicial como una casilla con una clase extra '.serpiente'
// Con el valor obtenido en la variable posicionSerpienteInicial definida anteriormente (número al azar entre 1 y 1600)
// Se define la casilla en la que la serpiente comenzará el juego

posicionSerpienteMoviendose = posicionSerpienteInicial;
// Se crea una variable posicionSerpienteMoviendose idéntica a posicionSerpienteInicial, sólo que esta la modificaremos a lo largo del juego

$(document).keydown(function(event) {
  // console.log(event.which);
  if (event.which === 32) {
    // direccionSerpiente = "quieta";
    // console.log("detener");
  } else {
    if (estadoDeJuego === "quieto") {
      if (
        event.which === 39 ||
        event.which === 40 ||
        event.which === 37 ||
        event.which === 38
      ) {
        // console.log(event.which)
        contadorTiempo--;
        $("#contadorTiempo").text(contadorTiempo);
        estadoDeJuego = "activo";
      }
    }
    if (juego === "activo") {
      if (
        event.which === 39 ||
        event.which === 40 ||
        event.which === 37 ||
        event.which === 38
      ) {
        estadoDeJuego = "activo";
        $("#estadoDeJuego").addClass("d-none");
      }
      if (event.which === 39) {
        direccionSerpiente = "derecha";
        // console.log("moverDerecha");
      } else if (event.which === 40) {
        direccionSerpiente = "abajo";
        // console.log("moverAbajo");
      } else if (event.which === 37) {
        direccionSerpiente = "izquierda";
        // console.log("moverIzquierda");
      } else if (event.which === 38) {
        direccionSerpiente = "arriba";
        // console.log("moverArriba");
      }
    }
  }
});

// $(document).on("scroll", function () {
//     // console.log("Y" + Math.floor(scrollY) + " | X" + Math.floor(scrollX))
// });

// Bloque de código que se repetirá cada 500 milisegundos para actualizar posición de serpiente
// Se come la fruta ---------------------------------------------------------------------------->
intervaloActualizarMovimientoSerpiente = setInterval(function() {
  /**/
  if (juego === "activo") {
    $("#contadorPuntos").text(puntuacion);
    if (tieneNumero(frutas, posicionSerpienteMoviendose)) {
      /**/
      if ($("#" + posicionSerpienteMoviendose).hasClass("frutaCheta")) {
        /**/
        $("#" + posicionSerpienteMoviendose).removeClass("frutaCheta"); /**/
        $("#" + posicionSerpienteMoviendose).addClass("casilla"); /**/
        // velocidadSerpiente -= 40 PREGUNTAR ---> NO FUNCA                          /**/
        puntuacion += 10; /**/
        contadorTiempo += 5; /**/
      } else {
        /**/
        $("#" + posicionSerpienteMoviendose).removeClass("fruta"); /**/
        $("#" + posicionSerpienteMoviendose).addClass("casilla"); /**/
        // velocidadSerpiente -= 20 PREGUNTAR                                        /**/
        puntuacion += 5; /**/
      } /**/
    } /**/
    // Se come la fruta -------------------------------------------------------------------->

    if (direccionSerpiente === "quieta") {
      // console.log("Funciona!!")
      posicionSerpienteMoviendose = posicionSerpienteMoviendose;
    } else if (direccionSerpiente === "derecha") {
      // Movimiento a la derecha --------------------------------------------------------------------------------------->
      if (posicionSerpienteMoviendose % 40 === 0) {
        // juego = 'terminado';
        // $('#cartelFinal').removeClass('d-none');
        // $('#cartelFinal').append('¡¡Perdiste!!')
        $("#" + posicionSerpienteMoviendose).addClass("casilla");
        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose -= 39;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteD");
      } else {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose += 1;

        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteD");
      }
      // Fin del movimiento a la derecha ------------------------------------------------------------------------------->
    } else if (direccionSerpiente === "abajo") {
      // Movimiento hacia abajo  --------------------------------------------------------------------------------------->
      if (posicionSerpienteMoviendose > 1560) {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose -= 1560;

        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteAb");
      } else {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose += 40;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteAb");
      }
      // Fin del movimiento abajo --------------------------------------------------------------------------------------->
    } else if (direccionSerpiente === "izquierda") {
      if (
        posicionSerpienteMoviendose % 40 === 1 ||
        posicionSerpienteMoviendose === 1
      ) {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose += 39;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteI");
      } else {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose--;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteI");
      }
    } else if (direccionSerpiente === "arriba") {
      if (posicionSerpienteMoviendose < 41) {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose += 1560;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteAr");
      } else {
        $("#" + posicionSerpienteMoviendose).addClass("casilla");

        if ($("#" + posicionSerpienteMoviendose).hasClass("serpienteD")) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteD");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAr")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAr");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteAb")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteAb");
        } else if (
          $("#" + posicionSerpienteMoviendose).hasClass("serpienteI")
        ) {
          $("#" + posicionSerpienteMoviendose).removeClass("serpienteI");
        }

        posicionSerpienteMoviendose -= 40;
        $("#" + posicionSerpienteMoviendose).removeClass("casilla");
        $("#" + posicionSerpienteMoviendose).addClass("serpienteAr");
      }
    }
  }
}, velocidadSerpiente);

let fruitIndex = 0;
frutas = [];
intervaloDeFrutas = setInterval(() => {
  if (estadoDeJuego === "activo") {
    if (direccionSerpiente != "muerta") {
      if (juego === "terminado") {
        clearInterval(intervaloDeFrutas);
      }
      crearFruta(frutas);
      fruitIndex++;
    } else if (direccionSerpiente === "muerta") {
      juego = "terminado";
      estadoDeJuego = "quieto";
    }
  }
}, tasaAparicionFruta);

// Poner contador de 60 segundos que cuando llegue a cero termine el juego
// Poner contador de puntaje que contará las frutas comidas
// El que come más frutas en 60 segundos gana
// Idea: cada fruta cheta da 5 segundos más de tiempo
// Idea: hacer que desaparezcan las frutas que no fueron comidas despues de X segundos
