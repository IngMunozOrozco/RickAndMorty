import axios from 'axios'
import { useState, useEffect } from 'react'


const ResidentInfo = ({url}) =>{
   
    const [data, setData] = useState({})

    useEffect(()=>{
        axios
        .get(url)
        .then(resp => {
            console.log(resp.data)
            setData(resp.data)
        })
        .catch(error => console.log(error))
    
},[])


const Episodes = () => {
    if (data.episode) {
      return data.episode.length; {/* Se crea una función que comprueba data.episode y retorna 
                                   la cantidad de episodios dentro de este */}
    }
  }

  const stats = () => {
    if (data.status === 'Alive') {
      return 'alive';
    } else if (data.status === 'Dead') {
      return 'dead';
    } else if (data.status === 'unknown') {
      return 'unknown';
    }
  }

  return (
    <article>
      {/* Agregamos la clase CSS condicional para el círculo según el estado */}
      <a className={`stats ${stats()}`}> <span className="circle"></span>   {data.status}</a>
      <p><img src={data.image} alt="" /></p>
      <h2 > <div className='names'>{data.name}</div> </h2>

      <div className='description'>
      <p>Especie:   {data.species}</p>
      <p>Episodios: {Episodes()}</p>
      <p>Origen:    {data.origin && data.origin.name}</p>
      </div>
    </article>
  )
}

export default ResidentInfo;