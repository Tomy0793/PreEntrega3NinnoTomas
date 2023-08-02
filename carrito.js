
// Modal para carrito
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];

//obtener datos carro
const vaciarCarro = document.getElementById("vaciar-carro")
const eliminarProducto = document.querySelector(".modal-content")

// Abrir modal al hacer clic en el botón
openModalBtn.addEventListener("click", () => {
modal.style.display = "block"
});

// Cerrar modal al hacer clic en la "x"
closeModalBtn.addEventListener("click", () => {
modal.style.display = "none"
})

// Cerrar modal al hacer clic fuera del contenido del modal
window.addEventListener("click", (event) => {
if (event.target === modal) {
    modal.style.display = "none"
}
})


//Borrar total carro
vaciarCarro.addEventListener("click", () =>{
    listadoProductosCarrito.innerHTML = ""
    precioTotalCarro = 0
    precioTotal.innerText = "$" + precioTotalCarro
    cantidadCarro = 0
    productosCarro.innerText = cantidadCarro

})

//Muestra contenido carro compras en modal
const mostrarCarro = () => {

listadoProductosCarrito.innerHTML = ""

carroCompras.forEach((producto) => {   
    const div = document.createElement("div")

    div.innerHTML += `
                <div class="producto-carro">
                        <img class="producto-imagen-carro" src="${producto.imagen}" alt="1">
                        <div class="producto-detalles-carrito" id="id"> 
                        <h3 class="producto-titulo">Modelo: ${producto.nombre}</h3>
                        <p class="producto-precio">- Medida: ${producto.medida}</p>
                        <p class="producto-precio">- Precio de lista: $${producto.precio}</p>
                        <p class="producto-precio">- Cantidad: ${producto.cantidad}</p>
                        <p class="producto-precio">- Precio final: $${producto.cantidad * producto.precio}</p>
                        <button class="carrito-producto-eliminar" id="carrito-producto-eliminar" value ="${producto.id}"><i class="bi bi-trash3" value ="${producto.id}"></i></button>
                        </div>
                </div>`
    listadoProductosCarrito.appendChild(div)


}

)}

//muestra que el producto fue eliminado con toastify
const mostrarProductoEliminado = () =>{
    Toastify({
        text: `Producto eliminado:`,
        duration: 2000,
        gravity: "top",
        position: "left",
        style:{
            background: "linear-gradient(to bottom, #3498db, #87ceeb)",
            borderRadius: "1rem"
        }

    }).showToast()
}

//Actualiza precios totales del carro
const actualizarPrecio = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    productosCarro.innerText = totalCantidad
    precioTotal.innerText = "$" + totalCompra
    console.log(productosCarro)
    console.log(precioTotal)
    guardarCarritoStorage(carroCompras)
  
}

//Elimina productos del carro
const eliminarProductoCarrito = (id) => {
    const productoIndex = carroCompras.findIndex(producto => producto.id == id)
    carroCompras.splice(productoIndex, 1)
    mostrarCarro(carroCompras)
    actualizarPrecio(carroCompras)
}

//listener eliminar producto
eliminarProducto.addEventListener("click", (e) =>{
    e.stopPropagation()
    if(e.target.classList.contains("carrito-producto-eliminar")){
        eliminarProductoCarrito(e.target.value)
        
mostrarProductoEliminado(carroCompras)


    }

})

// Función para guardar el carrito en localStorage
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Funcion para cargar carrito desde localstorage
const cargarCarrito = () =>{
    if(localStorage.getItem("carrito")){
        carroCompras = JSON.parse(localStorage.getItem("carrito"))
        mostrarCarro()
        actualizarPrecio(carroCompras)
    }
}
