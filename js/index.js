window.onload = () => {
  //esperar la carga de la pagina
  const tablero = document.getElementsByClassName("cuadrado");
  //sacar cantidad de cuadrados
  const maximo = tablero.length;
  let posicion = 1;
  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp") {
      posicion = dibujarTablero(posicion, tablero, maximo, -4);
    }
    if (e.code == "ArrowDown") {
      posicion = dibujarTablero(posicion, tablero, maximo, +4);
    }
    if (e.code == "ArrowLeft") {
      posicion = dibujarTablero(posicion, tablero, maximo, -1);
    }
    if (e.code == "ArrowRight") {
      posicion = dibujarTablero(posicion, tablero, maximo, +1);
    }
  });
};

function dibujarTablero(inicio, tablero, limite, valor) {
  let posicion = inicio;
  //despintar ultimo elemento activo
  tablero[posicion - 1].classList.remove("activo");
  //calcular futura posicion  
  posicion += valor;
  //validar no traspasar borde izquierdo
  if (posicion % 4 == 0) {
    if (valor == -1) {
      posicion -= valor;
    }
  }
  //validar no traspasar borde derecho
  if (inicio % 4 == 0 && valor == 1) {
    posicion -= valor;
  }
  //validar area inferior
  if (posicion > limite) {
    posicion -= valor;
  }
  //validar area superior
  if (posicion < 1) {
    posicion -= valor;
    if (posicion < 1) {
      posicion = 1;
    }
  }
  //dibujar tablero
  tablero[posicion - 1].classList.add("activo");
  //regresar nueva posicion
  return posicion;
}
