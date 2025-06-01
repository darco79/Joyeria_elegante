// Lista de productos (fácil de modificar)
const productos = [
    { id: 1, nombre: "Collar de Diamantes", precio: 499.99, imagen: "https://via.placeholder.com/250x150?text=Collar+Diamante" },
    { id: 2, nombre: "Pulsera de Oro", precio: 199.99, imagen: "https://via.placeholder.com/250x150?text=Pulsera+Oro" },
    { id: 3, nombre: "Anillo de Platino", precio: 399.99, imagen: "https://via.placeholder.com/250x150?text=Anillo+Platino" }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarrito();

    // Manejo del formulario de contacto
    document.getElementById("formulario-contacto").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Gracias por contactarnos. Te responderemos pronto.");
        this.reset();
    });
});

function cargarProductos() {
    const contenedor = document.getElementById("lista-productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarritoLocalStorage();
}

function actualizarCarrito() {
    document.getElementById("contador-carrito").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}