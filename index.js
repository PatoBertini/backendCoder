const personas = [];

class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `Su nombre de usuario es ${this.nombre} y su apellido es ${this.apellido}`;
  }
  addMascota(animal) {
    return this.mascotas.push(animal);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(name, author) {
    return this.libros.push({
      nombre: name,
      autor: author,
    });
  }
  getBookNames() {
    return this.libros.map((libro) => libro.autor);
  }
}

const persona1 = new Usuario(
  "El pepe",
  "Rodriguez",
  [
    { nombre: "narnia", autor: "don telio" },
    { nombre: "spider-man", autor: "peter parker" },
  ],
  ["perro", "gato", "jirafa"]
);
const persona2 = new Usuario(
  "El manonlo",
  "abismal",
  [
    { nombre: "piratas del cariber", autor: "jack sparrow" },
    { nombre: "batman", autor: "bruce waine" },
  ],
  ["escarabajo", "lombriz", "rata"]
);

persona1.addBook("probando", "libro");
console.log(persona1);

console.log(persona1.countMascotas())
console.log(persona2.getBookNames())
console.log(persona2.getFullName())
persona1.addMascota('pejelagarto')
console.log(persona1.countMascotas())

