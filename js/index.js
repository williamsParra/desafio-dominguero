//esperar la carga de la pagina
window.onload = () => {
  //extraer campo de juego
  const playLand = document.getElementsByClassName("contenedor");
  //inicializar navegacion
  let person = {
    y: 0,
    x: 0,
  };

  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp") {
      person = drawTable(playLand, person, 0, -1);
    }
    if (e.code == "ArrowDown") {
      person = drawTable(playLand, person, 0, 1);
    }
    if (e.code == "ArrowLeft") {
      person = drawTable(playLand, person, -1, 0);
    }
    if (e.code == "ArrowRight") {
      person = drawTable(playLand, person, 1, 0);
    }
  });
};

function drawTable(playLand, person, levelValue, deepValue) {
  //referencia de estado inicial
  let reference = { ...person };

  //quitar pintura de recuadro actual
  playLand[reference.y].children[reference.x].classList.remove("activo");
  //calcular maxima profundidad
  const maxDeep = playLand.length;

  //agregar coordenada futura
  reference.y += deepValue;
  reference.x += levelValue;

  //validar profundidad (direccion hacia abajo maxima)
  if (person.y + deepValue > maxDeep-1) {
    reference.y = maxDeep-1;
  }

  //validar profundidad (direccion hacia arriba)
  if (person.y + deepValue <= 0) {
    reference.y = 0;
  }
  //calcular maximo nivel
  const maxLevel = playLand[reference.y].children.length;

  //validar nivel (direccion hacia la derecha)
  if (person.x + levelValue > maxLevel-1) {
    reference.x = maxLevel-1;
  }

  //validar nivel (direccion hacia la izquierda)
  if (person.x + levelValue <= 0) {
    reference.x = 0;
  }

  playLand[reference.y].children[reference.x].classList.add("activo");

  return reference;
}
