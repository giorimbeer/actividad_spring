/*  

Muestra los datos en modo de catalogo
y configuracion de organizacion y busqueda 
por categorias

*/

// variables
let valorCategoria = "";
const Categorias = document.getElementById("lista-categorias");

//------------------------productos---------------

// consulta a la api por los productos teniendo en cuenta la categoria
async function obtenerProductos() {
  if (valorCategoria === "" || valorCategoria === "general") {
    try {
      const response = await fetch("http://localhost:8080/productos");

      if (!response.ok) throw new Error("Error en la solicitud");
      const productos = await response.json();

      mostrarProductos(productos);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    try {
      const response = await fetch(
        `http://localhost:8080/productos/categorias/${valorCategoria}`
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const productos = await response.json();
      mostrarProductos(productos);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

// añade y muestra informacion basica de los productos en el DOM
function mostrarProductos(productos) {
  const productList = document.getElementById("lista-productos");
  productList.innerHTML = "";

  productos.forEach((producto) => {
    const productDiv = document.createElement("div");

    const imageUrl = `data:image/jpeg;base64,${producto.imagen}`;

    productDiv.classList.add("producto");

    productDiv.innerHTML = `
                      <img
                        class="producto-img"
                        src= "${imageUrl}"
                        alt="imagen del Producto"
                      />
                      <div class="producto-info">
                        <p class="producto-nombre">${producto.nombre}</p>
                        <p class="producto-precio">$${producto.precio}</p>
                      </div>                  
                `;

    productList.appendChild(productDiv);
  });
}

//-----------------------categorias--------------------

// obtener las diferentes categorias que se encuentran en los productos
async function obtenerCategorias() {
  try {
    const response = await fetch("http://localhost:8080/productos/categorias");
    if (!response.ok) throw new Error("Error en la solicitud");

    const lisstaCategorias = await response.json();
    manejadorCategorias(lisstaCategorias);
  } catch (error) {
    console.error("Error:", error);
  }
}

// añade y muestra las categorias en el DOM
function manejadorCategorias(lisstaCategorias) {
  Categorias.innerHTML = `
                        <li><input type="radio" name="categoria" value="general"/>General</li>                                         
                `;

  lisstaCategorias.forEach((c) => {
    const categoria = document.createElement("li");

    categoria.innerHTML = `
                      <input type="radio" name="categoria" value="${c}"/>${c}
                `;

    Categorias.appendChild(categoria);
  });
}

// risar y canviar la consulta dependiendo lo que haga el usuario
Categorias.addEventListener("click", () => {
  const seleccionado = document.querySelector(
    'input[name="categoria"]:checked'
  );

  let valorAnterior = valorCategoria;

  valorCategoria = seleccionado.value;

  if (valorCategoria !== valorAnterior) {
    obtenerProductos();
  }
});

//-------------uso de las funciones-----------

obtenerCategorias();
obtenerProductos();
