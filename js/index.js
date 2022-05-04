//esperar la carga de la pagina
window.onload = () => {
  window.onscroll = null;
  //extraer campo de juego
  const playLand = document.getElementsByClassName("container");
  //inicializar navegacion
  let person = {
    y: 0,
    x: 0,
  };

  window.addEventListener("keydown", (e) => {
    e.preventDefault();

    if (e.code == "ArrowUp" || e.code == "KeyW") {
      person = drawTable(playLand, person, 0, -1);
    }
    if (e.code == "ArrowDown" || e.code == "KeyS") {
      person = drawTable(playLand, person, 0, 1);
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
      person = drawTable(playLand, person, -1, 0);
      scrollMovin(playLand, person, -1);
    }
    if (e.code == "ArrowRight" || e.code == "KeyD") {
      person = drawTable(playLand, person, 1, 0);
      scrollMovin(playLand, person, 1);
    }
  });
};

function drawTable(playLand, person, levelValue, deepValue) {
  //referencia de estado inicial
  let reference = { ...person };

  //quitar pintura de recuadro actual
  playLand[reference.y].children[reference.x].classList.remove("active");
  //calcular maxima profundidad
  const maxDeep = playLand.length;

  //agregar coordenada futura
  reference.y += deepValue;
  reference.x += levelValue;

  //validar profundidad (direccion hacia abajo maxima)
  if (person.y + deepValue > maxDeep - 1) {
    reference.y = maxDeep - 1;
  }

  //validar profundidad (direccion hacia arriba)
  if (person.y + deepValue <= 0) {
    reference.y = 0;
  }
  //calcular maximo nivel
  const maxLevel = playLand[reference.y].children.length;

  //validar nivel (direccion hacia la derecha)
  if (person.x + levelValue > maxLevel - 1) {
    reference.x = maxLevel - 1;
  }

  //validar nivel (direccion hacia la izquierda)
  if (person.x + levelValue <= 0) {
    reference.x = 0;
  }

  playLand[reference.y].children[reference.x].classList.add("active");
  if(reference.y !=person.y){
    scrollMovin(playLand,reference,levelValue);
  }
  return reference;
}

function scrollMovin(playLand, person, direction) {
  const maxLevel = playLand[person.y].children.length;
  //sacar ancho de contenedor maestro y dividir por la cantidad de hijos
  let widthScroll = playLand[person.y].offsetWidth / maxLevel;
  if (person.x <= maxLevel / 2) {
    //multiplicar ancho promedio x hijo activo y hacer direccion de scroll positiva o negativa segun dirección
    playLand[person.y].scroll(widthScroll * person.x * direction, 0);
  }
}
