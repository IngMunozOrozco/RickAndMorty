import "./styles.css";

//import InputControlled from './components/InputControlled'
import axios from "axios";
import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";

/*
- Traer una ubicación 
  Consumir el endpoint de las ubicaciones de Rick and Morty, hacer la funcionalidad para que al cargar la página, traiga una ubicación aleatoria, y mostrar el nombre de dicha ubicación

- Añadir un input que permita que el usuario pueda buscar el id de una ubicación en específico

-Iterar sobre el arreglo de url de los personajes que pertenecen a la ubicación mostrada

*/

function App() {
  const [pokemonType, setPokemonType] = useState({});
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    //numero random -> Math.floor((Math.random() * (max - min + 1)) + min);
    const randomId = Math.floor(Math.random() * 18 + 1);

    axios
      .get(`https://pokeapi.co/api/v2/type/${randomId}`)
      .then((resp) => {
        setPokemonType(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  /*
  const searchType = () => {
      axios
          .get( `https://pokeapi.co/api/v2/type/${searchId}` )
          .then( resp => {
              console.log(resp.data)
              setPokemonType(resp.data)
          })
          .catch(error => console.error(error))
  }
  */

  /*
      Cuando un boton de tipo submit es clickeado dentro de un formulario
      activa un evento llamado "submit" del form

  */

  const submit = (e) => {
    //Un metodo que impide el comportamiento predeterminado del evento
    e.preventDefault();

    axios
      .get(`https://pokeapi.co/api/v2/type/${searchId}`)
      .then((resp) => {
        console.log(resp.data);
        setPokemonType(resp.data);
      })
      .catch((error) => console.error(error));
  };

  // [ {}, {}, {}, {}, {}, {}, {} ]

  // 7 / 4 -> 1.75 -> 2
  // [{}, {}, {}, {}] / [{}, {}, {}]
  // arreglo.slice(inicio, fin)

  /*
      👍firstIndex -> donde empieza la extraccion
      👍lastIndex -> donde paramos de extraer
      👍cantidad de elementos por pagina
      👍pagina actual
  */

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 10;
  // totalPokemons = pokemonType.pokemon

  /*
  totalPerPage = 10
  pag inicio  fin     lastIndex
  1   0       9       10
  2   10      19      20
  3   20      29      30 
  */
  //[0, 1, 2, 3,4, 5, 6,7, 8, 9, 10]
  //arreglo.slice(0, 4)

  const lastIndex = pokemonsPerPage * currentPage; //uno mas
  const firstIndex = lastIndex - pokemonsPerPage;

  const pokemonsPaginated = pokemonType.pokemon?.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(pokemonType.pokemon?.length / pokemonsPerPage);
  // 1.75 -> round -> 2
  // 1.1 -> round -> 1
  // 1.75 -> floor -> 1
  // 1.75 -> ceil -> 2

  // [ 1, 2, 3, ... , totalPages ]
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      {/*<InputControlled/>*/}
      <h1>{pokemonType.name}</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="Ingresa el id del tipo"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {/*
              <button
              onClick={searchType}
              >
              Buscar
              </button>
              */}

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {pages.map((num) => (
        <button key={num} onClick={() => setCurrentPage(num)}>
          {num}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      <ul>
        {pokemonsPaginated?.map((pokemon) => (
          <Pokemon key={pokemon.pokemon.url} url={pokemon.pokemon.url} />
        ))}
      </ul>
    </>
  );
}

export default App;

/*
  Hacer el mismo ejercicio anterior, pero a través de otro componente.

  Crear un componente llamado “Character”, que reciba la url del personaje por props y la muestre.

  Remover del map la url, y en su lugar mostrar dicho componente. Pasarle la url por props.

  
  -> Consumir la url en el componente Character, y mostrar el nombre y la imagen del mismo
*/
