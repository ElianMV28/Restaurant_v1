const mongoose = require('mongoose');

const foodSchema = mongoose.Schema ({
    nombre : {
        type: String,
        required : true,
        unique : true
    
    },
    precio : {
        type: Number,
        required : true,
       
    },
    ingredientes : {
       type : String,
       required : true
    }


})

module.exports= mongoose.model("food",foodSchema)