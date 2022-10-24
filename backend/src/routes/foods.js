const express = require("express");

const foodSchema = require("../models/foods");
const router = express.Router();

// crear comida
router.post("/foods", (req, res) => {
  const food = foodSchema(req.body);
  food
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// Obtener Todas las comidas
router.get("/foods", (req, res) => {
    const food = foodSchema(res);
    foodSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });
  

  // Obtener Comida 
router.get("/foods/:id", (req, res) => {
    const {id} = req.params
    
    
    foodSchema
      .findOne({_id : id})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


    // Actualizar Comida 
router.put("/foods/:id", (req, res) => {
   const {id} = req.params
  const { nombre, precio, ingredientes} = req.body
  
  foodSchema
    .updateOne({_id :id },{$set :{nombre,precio,ingredientes}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


    // Eliminar Comida 
    router.delete("/foods/:nombre", (req, res) => {
      const {nombre} = req.params
    
     
     foodSchema
       .deleteOne({nombre : nombre })
       .then((data) => res.json(data))
       .catch((error) => res.json({ message: error }));
   });


    
  
module.exports = router;
