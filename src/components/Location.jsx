const Location = ({ location }) => {
  return (
    <div>
      <h2>Location Information</h2>
      <p>Nombre: {location.name}</p>
      <p>Tipo: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <p>Población: {location.residents.length}</p>
    
    </div>
  );
};


export default Location