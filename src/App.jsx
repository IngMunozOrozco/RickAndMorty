import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Location from './components/Location';
import Characters from './components/ResidentInfo';
import './Stars.css';


function App() {
  const [locationType, setLocation] = useState({});
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 126 + 1);
    axios
      .get(`https://rickandmortyapi.com/api/location/${randomId}`)
      .then((resp) => {
        console.log(resp.data);
        setLocation(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const searchType = (event) => {
    event.preventDefault();
    axios
      .get(`https://rickandmortyapi.com/api/location/${searchId}`)
      .then((resp) => {
        console.log(resp.data);
        setLocation(resp.data);
      })
      .catch((error) => console.error(error));
  };

  const [currentPage, setCurrentPage] = useState(1)
  const charsNumber = 6
  const lastIndex = charsNumber * currentPage
  const firstIndex = lastIndex - charsNumber
  const charsPaginated = locationType.residents?.slice(firstIndex, lastIndex)
  
  const totalPages = Math.ceil(locationType.residents?.length / charsNumber)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  return (
    <>
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    
    
    <div className='container'> {/* div de imagen, fondo y barra de bisqueda */}
    <div className='imgr'>   {/* ponemos la imagen del portal verder */}
    <div className='lola'><img src="./lola.gif" alt="" /></div>
    <div className='img2'><img src="./logo33.png" alt="" /></div>
    <div className='ban'>
    <form onSubmit={searchType}>
        <input
          type="text"
          placeholder="Ingresa el id del lugar"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit" >Search  <i className='bx bx-search'  ></i>  </button>
     
      </form>
      </div>
      <h1>¡Bienvenido a la dimensión {locationType.name}!</h1>
    </div>
      </div>

      <div className='title'>
      {locationType.name && <Location location={locationType} />} 
      </div> {/*     para renderizar desde otro componente se llama locationType
                     pero solo se renderiza si y solo si exite locationType*/ }
      
    <div className='chars'>
    <ul>
        {
          charsPaginated?.map(resident => (
          <Characters
          key = {resident}
          url = {resident}
          />    
            ))
        }
      </ul>
    </div>
    <div className='pagination'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Before 
        </button>

        {/* Mapeo para generar los cuadritos de número de página */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;