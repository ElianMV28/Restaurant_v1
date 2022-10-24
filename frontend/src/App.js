import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm i axios

const URL = 'http://localhost:3000/api/foods' //variable de entorno  

const App = () => {
 
  const [ listaPlatos, setlistaPlatos ] = useState([]) 
  const [ nombre, setNombre ] = useState('')
  const [id, setId ] = useState('')
  const [ precio, setprecio ] = useState('')
  const [ ingredientes, setIngredientes ] = useState('')
  const [ buscar, setBuscar ] = useState('')
  const [ bandera, setBandera ] = useState(true)

  useEffect(() => {
  getPlatos()
},[])

function filtro (){
 
  return listaPlatos.filter((plato) =>
         plato.nombre.toLowerCase().indexOf(buscar.toLowerCase()) > -1) 
           
}



const refresh = () =>{
  getPlatos()
  
  setBuscar('')
}

const buscando = () => {
    setlistaPlatos(filtro())
    
  
}

const getPlatos = async () => {
    const res = await axios.get(URL ) 
    
    setlistaPlatos(res.data) 
    console.log(res.data)
}

const addplato = async () => {
    let obj = { nombre, precio, ingredientes } 
    const res = await axios.post(URL, obj) 
    console.log(res.data)
    setNombre('')
    setprecio('')
    setIngredientes('')
    getPlatos()
}  

const deleteplato = async (nombre) => {
    const res = await axios.delete(URL+'/'+nombre)
    console.log(res.data)
    getPlatos()
}

const getplato = async (id) => {
    const res = await axios.get(URL+'/'+id)
    setId(res.data._id)
    setNombre(res.data.nombre)
    setprecio(res.data.precio)
    setIngredientes(res.data.ingredientes)
    setBandera(false)
    window.scrollTo(0,0)
}

const addOrUpdateplato = () => {
    bandera? addplato() : update()   
}

const update = async () => {
    const obj = {  id, nombre, precio, ingredientes }
    // console.log( 'id:' + id, 'n:' + nombre, 'precio:' + precio, 'ingredientes:' + ingredientes)
    const res = await axios.put(URL + '/' + id, obj)
    console.log(res.data)
    setBandera(true)
    setNombre('')
    setprecio('')
    setIngredientes('')
    getPlatos()
}


  return (
    <div className="container">   

     <nav className="navbar navbar-dark bg-warning">
       <a className="navbar-brand" href="/">Lista de Platos
      </a>
    </nav>

     <div className="row">

       <div className="col-md-4"> 
         <h1 className="text-warning">SyCAS Restaurant</h1>
         
         <input
             className="form-control mb-2" placeholder="Filtrar" value={buscar}
             onChange={(e) => setBuscar(e.target.value)} 
             
             onKeyUp={buscando}
          />
          <button 
              className="btn btn-warning" 
              onClick={refresh}>Actualizar</button>
        </div>
    
       <div className="col-md-4">
       
         <div className="card p-2 mt-3">
          
           <input
             className="form-control mb-2" placeholder="Nombre"
             value={nombre}
             onChange={(e) => setNombre(e.target.value)} 
           />

           <input 
             className="form-control mb-2"  placeholder="Precio" 
             value={precio}
             onChange={(e) => setprecio(e.target.value)} 
            />

            <input 
             className="form-control mb-2"  placeholder="Ingredientes" 
             value={ingredientes}
             onChange={(e) => setIngredientes(e.target.value)} 
            />

            <button 
              className="btn btn-warning" 
              onClick={addOrUpdateplato}>{bandera?'Agregar':'Aplicar'}</button>  
       </div>   
    </div>
       
       <div className="col-md-4">
         <h3 > Cantidad de Platos: { listaPlatos.length } </h3>
         
        </div>
     </div>
     
     <div className="row mt-4 ">   
         { listaPlatos.map(item => (
          <div key={item._id}  className="col-md-4">
            <div className="card p-3 m-2 border-warning">
               <p>Nombre: {item.nombre}</p>
               <p>Precio: {item.precio}</p>  
               <p>Ingredientes: {item.ingredientes}</p>  
               <div className="d-flex flex-row-reverse">
               <button 
                 className="btn btn-outline-danger" 
                 onClick={() => deleteplato(item.nombre)}>ELIMINAR</button> 
               <button 
                 className="btn btn-outline-success mr-2" 
                 onClick={() => getplato(item._id)}>MODIFICAR</button> 
                 </div>  
            </div>
          
          </div>

        ))} 
        </div> 
    </div>
  );
}

export default App;
