// Preguntas
const preguntas = [
  "Prefiero hacer un mapa que explicarle a alguien como tiene que llegar.",
  "Si estoy enojado(a) o contento(a) generalmente sé exactamente por qué.",
  "Sé tocar (o antes sabía tocar) un instrumento musical.",
  "Asocio la música con mis estados de ánimo.",
  "Puedo sumar o multiplicar mentalmente con mucha rapidez.",
  "Puedo ayudar a un amigo a manejar sus sentimientos porque yo lo pude hacer antes.",
  "Me gusta trabajar con calculadoras y computadores.",
  "Aprendo rápido a bailar un ritmo nuevo.",
  "No me es difícil decir lo que pienso en una discusión.",
  "Disfruto de una buena charla, discurso o sermón.",
  "Siempre distingo el norte del sur, esté donde esté.",
  "Me gusta reunir grupos de personas para eventos.",
  "La vida me parece vacía sin música.",
  "Siempre entiendo los gráficos que vienen en instrucciones.",
  "Me gusta hacer rompecabezas o juegos electrónicos.",
  "Me fue fácil aprender a andar en bicicleta o patines.",
  "Me enojo cuando oigo algo ilógico.",
  "Soy capaz de convencer a otros que sigan mis planes.",
  "Tengo buen sentido del equilibrio y coordinación.",
  "Veo relaciones entre números con rapidez.",
  "Me gusta construir modelos o esculturas.",
  "Tengo agudeza para encontrar significados de palabras.",
  "Puedo ver un objeto de distintas formas con facilidad.",
  "Asocio música con eventos de mi vida.",
  "Me gusta trabajar con números y figuras.",
  "Me gusta sentarme y reflexionar sobre mis sentimientos.",
  "Solo con ver construcciones me siento cómodo.",
  "Me gusta tararear, silbar o cantar en la ducha.",
  "Soy bueno(a) en el atletismo.",
  "Me gusta escribir cartas detalladas a mis amigos.",
  "Generalmente me doy cuenta de mi expresión facial.",
  "Me doy cuenta de las expresiones de los demás.",
  "Me mantengo en contacto con mis estados de ánimo.",
  "Percibo los estados de ánimo de otros.",
  "Sé bastante bien lo que otros piensan de mí."
];

const preguntasPorPagina = 7;
let paginaActual = 0;
let respuestas = [];
let nombreUsuario = "";

const nombreInput = document.getElementById('nombre');
const btnIniciar = document.getElementById('btn-iniciar');
const formNombreContainer = document.getElementById('form-nombre-container');
const testContainer = document.getElementById('test-container');
const preguntasContainer = document.getElementById('preguntas-container');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');

const modalResultados = new bootstrap.Modal(document.getElementById('modal-resultados'));
const contenidoResultados = document.getElementById('resultados-contenido');
const btnCerrarModal = document.getElementById('modal-cerrar');
const btnVolver = document.getElementById('btn-volver');

btnIniciar.addEventListener('click', () => {
  const nombreVal = nombreInput.value.trim();
  if(nombreVal === "") {
    alert("Por favor ingresa tu nombre completo para comenzar.");
    return;
  }
  nombreUsuario = nombreVal;
  formNombreContainer.classList.add('d-none');
  testContainer.classList.remove('d-none');
  paginaActual = 0;
  respuestas = [];
  cargarPagina(paginaActual);
});

btnAnterior.addEventListener('click', () => {
  guardarRespuestas();
  if(paginaActual > 0) {
    paginaActual--;
    cargarPagina(paginaActual);
  }
});

btnSiguiente.addEventListener('click', () => {
  if(!guardarRespuestas()) return;
  
  if(paginaActual < totalPaginas() -1) {
    paginaActual++;
    cargarPagina(paginaActual);
  } else {
    mostrarResultados();
  }
});

btnCerrarModal.addEventListener('click', () => {
  modalResultados.hide();
});

btnVolver.addEventListener('click', () => {
  modalResultados.hide();
  formNombreContainer.classList.remove('d-none');
  testContainer.classList.add('d-none');
  respuestas = [];
  paginaActual = 0;
  nombreUsuario = "";
  nombreInput.value = "";
});

function totalPaginas() {
  return Math.ceil(preguntas.length / preguntasPorPagina);
}

function cargarPagina(pagina) {
  preguntasContainer.innerHTML = "";
  const inicio = pagina * preguntasPorPagina;
  const fin = Math.min(inicio + preguntasPorPagina, preguntas.length);
  
  for(let i=inicio; i<fin; i++) {
    const divPregunta = document.createElement('div');
    divPregunta.className = "mb-3";
    
    const preguntaTexto = document.createElement('p');
    preguntaTexto.textContent = `${i+1}. ${preguntas[i]}`;
    divPregunta.appendChild(preguntaTexto);
    
    // Verdadero
    const divVerdadero = document.createElement('div');
    divVerdadero.className = "form-check";
    const radioV = document.createElement('input');
    radioV.className = "form-check-input";
    radioV.type = "radio";
    radioV.name = `respuesta-${i}`;
    radioV.id = `respuesta-${i}-V`;
    radioV.value = "V";
    const labelV = document.createElement('label');
    labelV.className = "form-check-label question-label";
    labelV.htmlFor = radioV.id;
    labelV.textContent = "Verdadero";
    divVerdadero.appendChild(radioV);
    divVerdadero.appendChild(labelV);
    
    // Falso
    const divFalso = document.createElement('div');
    divFalso.className = "form-check";
    const radioF = document.createElement('input');
    radioF.className = "form-check-input";
    radioF.type = "radio";
    radioF.name = `respuesta-${i}`;
    radioF.id = `respuesta-${i}-F`;
    radioF.value = "F";
    const labelF = document.createElement('label');
    labelF.className = "form-check-label question-label";
    labelF.htmlFor = radioF.id;
    labelF.textContent = "Falso";
    divFalso.appendChild(radioF);
    divFalso.appendChild(labelF);
    
    divPregunta.appendChild(divVerdadero);
    divPregunta.appendChild(divFalso);
    
    // Seleccionar respuesta guardada si existe
    if(respuestas[i]) {
      if(respuestas[i] === "V") radioV.checked = true;
      if(respuestas[i] === "F") radioF.checked = true;
    }
    
    preguntasContainer.appendChild(divPregunta);
  }
  
  btnAnterior.disabled = pagina === 0;
  btnSiguiente.textContent = (pagina === totalPaginas()-1) ? "Finalizar" : "Siguiente";
}

function guardarRespuestas() {
  const inicio = paginaActual * preguntasPorPagina;
  const fin = Math.min(inicio + preguntasPorPagina, preguntas.length);

  for(let i=inicio; i<fin; i++) {
    const radios = document.getElementsByName(`respuesta-${i}`);
    let seleccionado = false;
    for(let radio of radios) {
      if(radio.checked) {
        respuestas[i] = radio.value;
        seleccionado = true;
        break;
      }
    }
    if(!seleccionado) {
      alert(`Por favor responde la pregunta ${i+1}.`);
      return false;
    }
  }
  return true;
}

function mostrarResultados() {
  // Calcular puntajes
  let html = `<p><strong>Nombre:</strong> ${nombreUsuario}</p>`;
  
  const areas = {
    A: [9, 10, 17, 22, 30],
    B: [5, 7, 15, 20, 25],
    C: [1, 11, 14, 23, 27],
    D: [8, 16, 19, 21, 29],
    E: [3, 4, 13, 24, 28],
    F: [2, 6, 26, 31, 33],
    G: [12, 18, 32, 34, 35]
  };

  const nombresAreas = {
    A: "Verbal",
    B: "Lógico-Matemática",
    C: "Visual-Espacial",
    D: "Corporal-Kinestésica",
    E: "Musical-Rítmica",
    F: "Intrapersonal",
    G: "Interpersonal"
  };

  let puntajes = { A:0, B:0, C:0, D:0, E:0, F:0, G:0 };

  for(let area in areas) {
    for(let q of areas[area]) {
      if(respuestas[q-1] === "V") puntajes[area]++;
    }
  }

  for(let area in puntajes) {
    let nivel = "Nivel bajo";
    if(puntajes[area] >=5) nivel = "Sobresaliente";
    else if(puntajes[area] ===4) nivel = "Habilidad marcada";
    html += `<p><strong>${nombresAreas[area]}:</strong> ${puntajes[area]} puntos - <em>${nivel}</em></p>`;
  }

  contenidoResultados.innerHTML = html;
  testContainer.classList.add('d-none');
  modalResultados.show();
}
