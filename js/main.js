'use strict'

let botonComprar = document.querySelectorAll('.btn-comprar')
const numeroCarrito = document.querySelector('.numero-carrito')

const obtenerBebidas = async () => {
    try {
        const respuesta = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        const data = await respuesta.json()
        const product = await data.drinks
        const bebidas = await product.map(bebida => {
            return{
                nombre: bebida.strDrink,
                img: bebida.strDrinkThumb,
                id: bebida.idDrink
            }
        })
        crearTarjeta(bebidas)
        crearTarjeta2(bebidas)
        agregarEvento()

    } catch (error) {
        console.log(error)
    }
}

const crearTarjeta = (bebidas) => {
    const contenedorDeProductos = document.querySelector('.contenedor-de-productos')

    // Elijo todos los productos con ForEach

    // bebidas.forEach(bebida => {
    //     const div = document.createElement('div')
    //     div.classList.add('card', 'col-3', 'mx-2', 'mb-3', 'alto')
    //     div.innerHTML = `
    //     <img src=${bebida.img} class="card-img-top" alt=${bebida.nombre}>
    //     <div class="card-body">
    //     <h5 class="card-title">${bebida.nombre}</h5>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //     </div>
    // `
    // })
    

    // Elijo 12 bebidas
    for(let i = 0; i < 12; i++){
        
        const div = document.createElement('div')
        div.classList.add('card', 'col-lg-3', 'col-md-5', 'mx-2', 'mb-3', 'alto')
        div.innerHTML = `
        <img src=${bebidas[i].img} class="card-img-top" alt=${bebidas[i].nombre}>
        <div class="card-body cuerpo-tarjeta">
            <div>
            <h5 class="card-title mb-4">${bebidas[i].nombre}</h5>
            <p>Precio: <b class="text-success">$${bebidas[i].id}</b></p>
            </div>
            <div class="contenedor-btn mt-3 flex-column align-items-lg-center flex-lg-row">
                <a class="btn btn-success me-lg-2 tamaño-de-letra mb-2 mb-lg-0 btn-comprar" id=${bebidas[i].id}>Comprar</a>
                <a href="#" class="btn btn-primary ms-lg-2 tamaño-de-letra">Saber mas</a>
            </div>
        </div>
        `
        // console.log(precio)
        contenedorDeProductos.appendChild(div)
    }
    
}

const crearTarjeta2 = (bebidas) => {
    const contenedorDeProductos2 = document.querySelector('.contenedor-de-productos-2')

    for(let i = 12; i < 24; i++){

        const div = document.createElement('div')
        div.classList.add('card', 'col-lg-3', 'col-md-5', 'col-md-4' , 'mx-2', 'mb-3', 'alto')
        div.innerHTML = `
        <img src=${bebidas[i].img} class="card-img-top" alt=${bebidas[i].nombre}>
        <div class="card-body cuerpo-tarjeta">
            <div>
            <h5 class="card-title mb-4">${bebidas[i].nombre}</h5>
            <p>Precio: <b class="text-success">$${bebidas[i].id}</b></p>
            </div>
            <div class="contenedor-btn mt-3 flex-column align-items-lg-center flex-lg-row">
                <a class="btn btn-success me-lg-2 tamaño-de-letra mb-2 mb-lg-0 btn-comprar" id=${bebidas[i].id}>Comprar</a>
                <a href="#" class="btn btn-primary ms-lg-2 tamaño-de-letra">Saber mas</a>
            </div>
        </div>
        `
        contenedorDeProductos2.appendChild(div)
    }
}


obtenerBebidas()


const agregarEvento = () => {
    botonComprar = document.querySelectorAll('.btn-comprar')

    botonComprar.forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito)
    })
}

let productosEnCarrito;

const agregarAlCarrito = async e => {
    const idBoton = e.currentTarget.id
    const productoAgregado = await obtenerProductoId(idBoton)

    if(productosEnCarrito.some(producto => producto.idDrink === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.idDrink === idBoton)
        productosEnCarrito[index].cantidad++
    }else{
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }

    actualizarNumeroCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}

const actualizarNumeroCarrito = () => {
    let numero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numeroCarrito.textContent = numero
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumeroCarrito()
}else{
    productosEnCarrito = []
}

const obtenerProductoId = async (id) => {
    try {
        const respuesta = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await respuesta.json()
        const product = await data.drinks[0]
        console.log(product)
        return product
    } catch (error) {
        console.log(error)
    }
}

