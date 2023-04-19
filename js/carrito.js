'use strict'

const productosEnCarrito = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

const contenedorCarritoVacio = document.querySelector(
  ".contenedor-carrito-vacio"
);
const contenedorProductosElegidos = document.querySelector(
  ".contenedor-productos-elegidos"
);
const compraResumenBtn = document.querySelector(".compra-resumen");
const contenedorMensajeCompra = document.querySelector(".contenedor-mensaje");
const contenedorCategoria = document.querySelector(".contenedor-categoria");
const btnEliminarCompra = document.querySelector('.btn-finalizar-compra2')
const btnFinalizarCompra = document.querySelector('.btn-finalizar-compra')
const precioTotal = document.querySelector('.precio-total')
let botonesEliminar = document.querySelectorAll(".eliminar-producto-carrito");
const negar = document.querySelector('.negar')
const afirmar = document.querySelector('.afirmar')
const afirmarCompra = document.querySelector('.afirmar-compra') 
const mensaje = document.querySelector('.mensaje')
const cerrarMensaje = document.querySelector('.cerrar')

const eliminarDelCarrito = e => {
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.idDrink === idBoton)
    productosEnCarrito.splice(index,1)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
};

const actualizarBotonesEliminar = () => {
  botonesEliminar = document.querySelectorAll(".eliminar-producto-carrito");

  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", eliminarDelCarrito);
  });
};

const actualizarTotal = () => {
    const totalCalculado = productosEnCarrito.reduce((acc,producto) => acc + (producto.idDrink * producto.cantidad), 0)
    precioTotal.innerHTML = `$${totalCalculado}`
}

const cargarProductosCarrito = () => {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    
    contenedorCarritoVacio.classList.add("invisible");
    contenedorProductosElegidos.classList.remove("invisible");
    compraResumenBtn.classList.remove("invisible");
    contenedorMensajeCompra.classList.add("invisible");
    contenedorCategoria.classList.remove("invisible");

    contenedorProductosElegidos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("contenedor-compra", "row", "mb-3");
      div.innerHTML = `
            <div class="col-6 d-flex align-items-center">
                <img class="col-3 mini-img" src=${producto.strDrinkThumb} alt=${
        producto.strDrink
      }>
                <a href="#" class="titulo-link" >${producto.strDrink}</a>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center">
                <span>${producto.cantidad}</span>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
                <span>$${producto.idDrink * producto.cantidad}</span>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
                <button class="eliminar-producto-carrito" id="${producto.idDrink}"><i class="bi bi-trash"></i></button>
            </div> 
        `;
      contenedorProductosElegidos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("invisible");
    contenedorProductosElegidos.classList.add("invisible");
    compraResumenBtn.classList.add("invisible");
    contenedorMensajeCompra.classList.add("invisible");
    contenedorCategoria.classList.add("invisible");
  }

  actualizarBotonesEliminar()
  actualizarTotal()
};

cargarProductosCarrito();

const vaciarCarrito = () => {

    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()

}
btnEliminarCompra.addEventListener('click',vaciarCarrito)

const cancelarCompra = () => {
    negar.addEventListener('click',() => {
        document.body.classList.remove("mensajeBody")
        contenedorMensajeCompra.classList.add("invisible");
    })
}

const cerrarMensajeModal = () => {
    cerrarMensaje.addEventListener('click',() => {
        document.body.classList.remove("mensajeBody")
        contenedorMensajeCompra.classList.add("invisible");
    })
}

const confirmarCompra = () => {
    afirmar.addEventListener('click',() => {

        productosEnCarrito.length = 0
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

        mensaje.classList.add('invisible')
        afirmarCompra.classList.remove('invisible')
        contenedorCarritoVacio.classList.remove("invisible");
        contenedorProductosElegidos.classList.add("invisible");
        compraResumenBtn.classList.add("invisible");
        contenedorCategoria.classList.add("invisible");
    })
}

const comprarCarrito = () => {
    
    contenedorMensajeCompra.classList.remove("invisible");
    document.body.classList.add("mensajeBody")
    cancelarCompra()
    confirmarCompra()
    cerrarMensajeModal()
}
btnFinalizarCompra.addEventListener('click',comprarCarrito)