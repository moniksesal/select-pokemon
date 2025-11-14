/*cuando seleccionemos un pokemon y hagamos click en el botón Obtener información,
se mostrará en pantalla: NOMBRE, IMAGEN, TIPO, ALTURA Y PESO
NOMBRE: forms, name
IMAGEN: sprites. front_default
TIPO: types, type, name
ALTURA: height
PESO: weight
*/

//Definimos las variables
//Capturamos el botón
//Capturamos el div donde va a ir toda la info de los pokemon
//Capturamos cada uno de los pokemon

const boton = document.getElementById("get-pokemon")
let infoPokemon = document.getElementById("info-pokemon")
let pokemonSeleccionado = document.getElementById("pokemon-select")

//Pedimos la información a la API

function mostrarInfoPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error ("Se ha producido un error")
        }
        return response.json()
    })
    .then((data) => { //con la data que ya tenemos de response.json(), sacamos las variables de dentro del archivo de la api
        const nombre = data.forms[0].name
        const imagen = data.sprites.front_default
        const tipo = data.types.map(elemento => elemento.type.name).join(", ") //elemento es el item actual del array en cada vuelta
        const altura = data.height / 10 //para ponerlo en kg y m hay que dividir entre 10
        const peso = data.weight / 10
        infoPokemon.innerHTML =
            `
            <h2>${nombre}</h2>
            <img src="${imagen}" alt="${nombre}">
            <p>Tipo: ${tipo}</p>
            <p>Altura: ${altura}m</p>
            <p>Peso: ${peso}kg</p>
            `
    })
    .catch(err => console.log(err))
    }

    boton.addEventListener("click", () => {
        mostrarInfoPokemon(pokemonSeleccionado.value)
})

