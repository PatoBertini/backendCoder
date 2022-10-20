// Lado del cliente
const socket = io();

//============= FORM - PRODUCTOS - PLANTILLAS ======================

//=================================== Creamos variables globales

const layout = document.getElementById("layoutProductos");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const url = document.getElementById("url");

//=================================== Configuramos la interaccion cliente-server

// 2) Recibimos del servidor el mensaje emitido y con la funcion render lo pintamos en el html
// 5) volvemos a escuchar el mensaje del servidor y volvemos a pintar el html
socket.on("productos", (arrayProductos) => {
  hbsPlantilla(arrayProductos).then((html) => {
    layout.innerHTML = html;
  });
});

// 3.a) creamos una funcion del form para crear un objeto newProduct con los valores traidos del form y enviarlo al servidor
const sendProduct = (e) => {
  const newProduct = {
    producto: producto.value,
    precio: precio.value,
    url: url.value,
  };

  // 3.b) Recibimos los valores del form como un obj newProduct y lo enviamos al servidor
  socket.emit("newProduct", newProduct);
  return false;
};

// funcion para renderizar los productos en el layout del html traido de plantilla hbs
const hbsPlantilla = (productos) => {
  return fetch("plantillas/tablaProductos.hbs")
    .then((resp) => resp.text()) // pasamos la promesa a texto en vez de json
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla); // creamos la variable template ( que despues se transforma en una funcion) y compilamos la plantilla traida del fetch
      const html = template({ productos }); // retornamos un nuestros productos compilados en html segun nuestra plantilla
      return html;
    });
};

//============= FORM - MENSAJES  ======================

const mensaje = document.getElementById("mensaje");
const email = document.getElementById("email");
const layoutMsj = document.getElementById("layoutMensajes");

// B) Primera escucha del msj traido del servidor
// D) volvemos a escuchar el mensaje del servidor y volvemos a pintar el html
socket.on("mensajes", (msj) => {
  render(msj);
  //   console.log(msj);
});

// C.a) creamos una funcion del form para crear un objeto newMessage con los valores traidos del form y enviarlo al servidor
const sendMessage = (e) => {
  const newMessage = {
    email: email.value,
    mensaje: mensaje.value,
  };
  // C.b) Recibimos los valores del form como un obj newMessage y lo enviamos al servidor
  socket.emit("newMessage", newMessage);
  //   console.log(newMessage);
  return false;
};

const render = (mensajes) => {
  const html = mensajes.map((msj) => {
    return `<div class='card'>
      
      <p class='mensajeEntero'> <span class='id'> ${msj.id}) </span><span class='mail'>${msj.email}</span> <span class='date'>{${msj.fyh}}:</span> <span class='msj'>${msj.mensaje}</span> </p>
          
          
          </div>`;
  });
  layoutMsj.innerHTML = html.join(" ");
};
