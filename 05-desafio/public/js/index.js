// Este es nuestro cliente
const socket = io();

const button = document.getElementById("enviar");
const mensaje = document.getElementById("mensaje");
const autor = document.getElementById("autor");
const div = document.getElementById("layoutMensaje");

const addMessage = (e) => {
  const inputMsj = mensaje.value;
  const autorMsj = autor.value;
  socket.emit("new-mensaje", { text: inputMsj, author: autorMsj });
  return false;
};

const render = (array) => {
  const html = array.map((elem) => {
    return `<div class='card'>
        <strong>${elem.author}</strong>:
        <em>${elem.text}</em> </div>`;
  });
  div.innerHTML = html.join(" ");
};

// Escuchando el evento de rta del lado del servidor
socket.on("mensajes", (rta) => {
  render(rta);
});

// Escuchar el evento respuestaServer del lado del cliente
// socket.on("respuestaServer", (data) => {
//   console.log(data);
//   const mensajes = data.map(
//     (item) =>
//       `<h3>Mensaje devuelto</h3>
//     <li>El mensaje enviado es: ${item.autor}</li>
//     <li>El mensaje enviado es: ${item.mensaje}</li>
//     <li>El ID del usuario es: ${item.socketId}</li>
//     `
//   );
//   div.innerHTML = mensajes.join("");
//   console.log(data);
// });
