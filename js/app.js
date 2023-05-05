// Variable
const formulario = document.getElementById("formulario");
const listatareas = document.getElementById("tareas");

const contenedorerrores = document.getElementById("contenedorerrores");
const listaerrors = document.getElementById("errors");
const errorsclose = document.getElementById("errorsclose");
let errors = [];
// errors.push('hols')
let tareas = [];

// Constantes de navbar
const boton = document.getElementById("hamburger");
const menu = document.getElementById("menu");
// Fin

// Funcion de abrir y cerrar el nav
boton.addEventListener("click", function () {
  menu.classList.toggle("nav__items--open");
});
// Fin

// EventListeners

eventListeners();

function eventListeners() {
  // CUando el usuario agrega una nueva tarea
  formulario.addEventListener("submit", agregarTarea);

  errorsclose.addEventListener("click", cerrarerrores);

  // Cuando el documento esta listo

  document.addEventListener("DOMContentLoaded", () => {
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    console.log(tareas);
    crearHTML();
  });
}

// Funciones

function agregarTarea(e) {
  let errors = [];

  e.preventDefault();

  // input
  const titulo = document.getElementById("titulo").value;
  // select
  const estado = document.getElementById("estado").value;
  // input
  const descripcion = document.getElementById("descripcion").value;

  if (titulo === "") {
    errors.push("titulo");
  }
  if (estado === "") {
    errors.push("estado");
  }
  if (descripcion === "") {
    errors.push("descripcion");
  }

  if (estado != "" && titulo != "" && descripcion != "") {
    let tarea = {
      id: Date.now(),
      titulo,
      estado,
      descripcion,
    };

    tareas = [...tareas, tarea];
    // console.log(tareas);
    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
  }

  // console.log(tarea);

  if (errors.length) {
    cerrarerrores();
    contenedorerrores.style.display = "flex";
    mostrarErrors(errors);
  } else {
    cerrarerrores();
  }

  // Añadir al arreglo de tareas
}

// Mostrar Mensajes de error
function mostrarErrors(errors) {
  errors.forEach((error) => {
    const autoHTML = document.createElement("li");
    // console.log(error);
    autoHTML.classList.add("errors__item");
    autoHTML.textContent = `
      El campo ${error} no puede estar vacio 
  `;

    // Insertar el contenido
    listaerrors.appendChild(autoHTML);
  });
}
// Limpiar Alertas errors
function cerrarerrores() {
  contenedorerrores.style.display = "none";

  while (listaerrors.firstChild) {
    listaerrors.removeChild(listaerrors.firstChild);
  }
}

// Muestra un listado de las tareas

function crearHTML() {
  limpiarHTML();
  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      const taskitem = document.createElement("div");
      taskitem.classList.add("task__item");

      taskitem.innerHTML = `
      <div class="task__titles">
      <h2 class="task__title">
          ${tarea.titulo}
      </h2>
      <i class="fa-solid fa-xmark task__close" onclick="borrarTarea(${tarea.id})"></i>
       </div>
  
       <div class="task__category">
      <span>  ${tarea.estado}</span>
       </div>
       <p class="task__description">
       ${tarea.descripcion}
       </p>
      
      `;

        // Añadir la funcion de eliminar

      listatareas.appendChild(taskitem);
    });

    sincronizarStorage();
  }
}

// Agregar las tareas actuales a localStorage

function sincronizarStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
 
}

// Eliminar Tarea

function borrarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id != id);
  sincronizarStorage();
  crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
  while (listatareas.firstChild) {
    listatareas.removeChild(listatareas.firstChild);
  }
}
