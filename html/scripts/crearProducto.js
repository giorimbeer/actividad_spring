/*  

Realizacion de un CRUD de productos usando la api creada con spring
y configuracion de una interfaz grafica en html y css

*/

//------------------------manejo del contenido del formulario-----------------------

// Formulario principal
const form = document.getElementById("producto-form");

// Variables globales para datos y estado
let nombre, precio, descripcion, categoria, imagen;
let uploadArea, fileInput, preview;
let accion = "crear";
let nombreViejo = "";

nombre = document.getElementById("nombre");
precio = document.getElementById("precio");
descripcion = document.getElementById("descripcion");
categoria = document.getElementById("categoria");
fileInput = document.getElementById("file-input");
preview = document.getElementById("preview");

fileInput.addEventListener("change", handleFileInputChange);

// Manejo de botones
const btnCreate = document.getElementById("btnCreate");
const btnDelete = document.getElementById("btnDelete");
const btnEdit = document.getElementById("btnEdit");

// Evento para crear un producto
btnCreate.addEventListener("click", () => {
  accion = "crear";
  renderForm("POST", "Crear Producto", "Subir Imagen");
});

// Evento para eliminar un producto
btnDelete.addEventListener("click", () => {
  form.method = "DELETE";
  form.innerHTML = `
        <div class="text-campos">
          <h1>Eliminar Producto</h1>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />
          <button id="btnEnviar">Eliminar</button>
        </div>                                         
      `;
  nombre = document.getElementById("nombre");

  accion = "eliminar";
});

// Evento para editar un producto
btnEdit.addEventListener("click", () => {
  accion = "editar";
  renderForm("PUT", "Editar Producto", "Canbiar Imagen");
  document.getElementById("btnBuscar").addEventListener("click", () => {
    obtenerProducto(nombre.value);
    nombreViejo = nombre.value;
  });
});

// Renderiza el formulario dinámicamente
function renderForm(method, mainTitle, imgTitle) {
  form.method = method;
  form.innerHTML = `
        <div class="subir-img">
          <h2>${imgTitle}</h2>

          <span
            class="btn-upload"
            onclick="document.getElementById('file-input').click()"
            >buscar en tu equipo</span
          >

          <input type="file" id="file-input" accept="image/*" />

          <div class="preview" id="preview"></div>
        </div>

        <div class="text-campos">
          <h1>${mainTitle}</h1>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />

          ${
            accion === "editar"
              ? `<button id="btnBuscar" type="button">Buscar</button>`
              : ""
          }

          <label for="precio">Precio:</label>
          <input type="number" id="precio" name="precio" required min="0" />

          <label for="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            cols="50"
            required
          ></textarea>

          <label for="categoria">Categoria:</label>
          <input type="text" id="categoria" name="categoria" required />

          <button id="btnEnviar">${
            accion === "crear" ? "Enviar" : "Confirmar"
          }</button>
        </div>
  `;

  attachFormElements();
}

// Vincula los nuevos elementos del formulario
function attachFormElements() {
  nombre = document.getElementById("nombre");
  precio = document.getElementById("precio");
  descripcion = document.getElementById("descripcion");
  categoria = document.getElementById("categoria");
  fileInput = document.getElementById("file-input");
  preview = document.getElementById("preview");

  fileInput.addEventListener("change", handleFileInputChange);

  if (accion === "editar") {
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", () => {
      obtenerProducto(nombre.value);
      nombreViejo = nombre.value;
    });
  }
}

// Evento del envío del formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    nombre: nombre.value,
    precio: precio?.value,
    descripcion: descripcion?.value,
    imagen: imagen,
    categoria: categoria?.value,
  };

  if (accion === "crear") crearProducto(formData);
  if (accion === "eliminar") deleteProducto(nombre.value);
  if (accion === "editar") editProducto(nombreViejo, formData);
});

//------------------------manejo de las consultas HTTP-----------------------

// Crear un producto
async function crearProducto(data) {
  try {
    const response = await fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Producto creado con éxito");
      cleanValues();
    } else
      alert("Error al crear el producto, nombre y imagen deben ser unicos");
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
}

// Eliminar un producto
async function deleteProducto(name) {
  try {
    const response = await fetch(`http://localhost:8080/productos/${name}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Producto eliminado con éxito");
      nombre.value = "";
    } else alert("Error al eliminar el producto");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}

// Editar un producto
async function editProducto(nombre, data) {
  try {
    const response = await fetch(`http://localhost:8080/productos/${nombre}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Producto actualizado con éxito");
      cleanValues();
    } else alert("Error al actualizar el producto");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
}

// Obtener un producto
async function obtenerProducto(nombre) {
  try {
    const response = await fetch(`http://localhost:8080/productos/${nombre}`);
    if (!response.ok) throw new Error("Producto no encontrado");
    const producto = await response.json();
    actualizarFormulario(producto);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }
}

// rellena los campos del formulario
function actualizarFormulario(producto) {
  precio.value = producto.precio;
  descripcion.value = producto.descripcion;
  categoria.value = producto.categoria;
  preview.innerHTML = `<img src="data:image/jpeg;base64,${producto.imagen}" alt="Imagen del producto" />`;
}

//limpiar los campos del formulario
function cleanValues() {
  nombre.value = "";
  precio.value = "";
  descripcion.value = "";
  preview.innerHTML = "";
  categoria.value = "";
}

//------------------------manejo de las imagnes-----------------------

function handleFileInputChange(event) {
  const files = event.target.files;
  handleFiles(files);
}

function handleFiles(files) {
  const file = files[0];
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa de la imagen" />`;
      imagen = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecciona un archivo de imagen válido.");
  }
}
